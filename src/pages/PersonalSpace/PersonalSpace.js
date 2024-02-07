import React, { useCallback, useEffect, useRef, useState } from "react";
import "./PersonalSpace.scss";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import { useAPIContext } from "../../contexts/APIContextProvider";
import { PersonalCard, TableArrayDatas, UpdateUsers } from "../../components";
import LoadingElements from "../../components/LoadingElements/LoadingElements";

const PersonalSpace = () => {

  const { courseAPI } = useAPIContext();
  const [ canUpdateUser, setCanUpdateUser] = useState(false);
  const [ courses, setCourses] = useState([]);
  const [ instrument, setInstrument] = useState([]);
  const [ instrumentList, setInstrumentList] = useState({});
  const [ isLoading, setIsLoading] = useState(true);
  const { userId,userAPI,setUsername } = useAuthContext();
  const apiIsCalledRef = useRef(false);
  const [ allUsersInfos, setAllUsersInfos ] = useState({
    "id": '',
    "firstName": '',
    "lastName": '',
    "role": '',
    "username": '',
    "photo": '',
    "email": '',
    "createdAt": '',
    "subscription": ''
  });

  const strLcFirst = (value) => {
    return (value + "").charAt(0).toUpperCase() + value.substr(1);
  };

  const getUserDataOnly = useCallback(async() => {
    setIsLoading(true);
    try {
      const response = await userAPI.show(userId);
      const user = response.data;
      setAllUsersInfos({
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "role": user.roles,
        "username": strLcFirst(user.firstName) + ' ' + user.lastName.toUpperCase(),
        "photo": user?.image?.imageName,
        "email": user.email,
        "createdAt": user.createdAt,
        "subscription": user?.subscription?.name
      });
      
      const userInstrumentID = user.instruments?.map((e) => e.id);
      const userInstrumentName = user.instruments?.map((e) => e.name);
      const formattedInstrumentList = userInstrumentName.join(', ');
      setInstrument(formattedInstrumentList);
      setInstrumentList(userInstrumentID);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);

    }

  },[userAPI,userId]);

  const getUserCourse = useCallback( async(dataUser,response) => {

    setAllUsersInfos({
      "id": dataUser.user.id,
      "firstName": dataUser.user.firstName,
      "lastName": dataUser.user.lastName,
      "role": dataUser.user.roles,
      "username": strLcFirst(dataUser.user.firstName) + ' ' + dataUser.user.lastName.toUpperCase(),
      "photo": dataUser.user?.image?.imageName,
      "email": dataUser.user.email,
      "createdAt": dataUser.user.createdAt,
      "subscription": dataUser.user?.subscription?.name
    });

    localStorage.setItem('username', strLcFirst(dataUser.user.firstName) + ' ' + dataUser.user.lastName.toUpperCase());
    setUsername(strLcFirst(dataUser.user.firstName) + ' ' + dataUser.user.lastName.toUpperCase());
    const userInstrumentID = dataUser.user.instruments.map((e) => e.id);
    const userInstrumentName = dataUser.user.instruments.map((e) => e.name);
    const formattedInstrumentList = userInstrumentName.join(', ');
    setInstrument(formattedInstrumentList);
    setInstrumentList(userInstrumentID);

    const allDatas = response.map(e => {
      return {
        id : e.id,
        createdAt: e.createdAt,
        percentageWatched: e.percentageWatched,
        courses:e.course
      }
    });
    setCourses([...courses, ...allDatas]);
    setIsLoading(false);
      
  },[setUsername, courses])  


  useEffect(() => {

    const displayCourse = async () => {
      setIsLoading(true);

      try {

        const response = await courseAPI.showCourseByUser(userId);
        if( response && Object.values(response).length === 0) {
          getUserDataOnly();
        } else {
          getUserCourse(response[0],response);
        }

      } catch (error) {
          console.error(error);
          setIsLoading(false);
      }
    }

    if(userId && apiIsCalledRef.current === false && Object.values(courses).length === 0 ){
      setTimeout(() => {
        displayCourse();
        apiIsCalledRef.current = true ;
      }, 3000);
    }

  }, [userId,userAPI,courseAPI,allUsersInfos ,instrument, courses ,setUsername ,getUserDataOnly ,getUserCourse]);


  return (
    <div className="global-container-personal-space">
      
      { canUpdateUser && (
          <UpdateUsers 
            firstName={allUsersInfos.firstName}  
            lastName={allUsersInfos.lastName} 
            email={allUsersInfos.email}  
            userId={userId}
            roles={allUsersInfos.role[0]}
            instrumentPlayed={instrumentList} 
            srcImg={allUsersInfos.photo ? '/images/upload/' + allUsersInfos.photo : '/images/upload/profile.png'}
            handleCancel={() => setCanUpdateUser(false)}
          />
      )}

      { (isLoading || isLoading === null) && (
          <LoadingElements />
      )}


      { (canUpdateUser === false && allUsersInfos.username !== '' ) && (
        <>
          <PersonalCard 
            srcImg={allUsersInfos.photo ? '/images/upload/' + allUsersInfos.photo : '/images/upload/profile.png'}
            username={allUsersInfos.username} 
            email={allUsersInfos.email} 
            registrationDate={allUsersInfos.createdAt}
            instrument={instrument}
            subscription={allUsersInfos.subscription ? allUsersInfos.subscription : 'Aucun'}
            handleClick={() => setCanUpdateUser(true)}
          />
          
          <TableArrayDatas arrayOfDatas={courses} />
        </>
      )}
    </div>
  );
};


export default PersonalSpace;
