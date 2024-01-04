import React, { useContext, useEffect, useState } from "react";
import "./PersonalSpace.scss";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useAPIContext } from "../../contexts/APIContextProvider";
import { PersonalCard, TableArrayDatas, UpdateUsers } from "../../components";
import LoadingElements from "../../components/LoadingElements/LoadingElements";

const PersonalSpace = () => {

  const { courseAPI } = useAPIContext();
  const [ canUpdateUser, setCanUpdateUser] = useState(false);
  const [ count, setCount] = useState(0);
  const [ courses, setCourses] = useState([]);
  const [ instrument, setInstrument] = useState([]);
  const [ instrumentList, setInstrumentList] = useState("");
  const [ isLoading, setIsLoading] = useState(false);
  const { userId , userAPI , setUsername} = useContext(AuthContext);
  const [allUsersInfos, setAllUsersInfos] = useState({
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

  useEffect(() => {

    const displayCourse = async () => {
      setIsLoading(true);
      try {
        const response = await courseAPI.showCourseByUser(userId);
        const dataUser = response[0];
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
        const userInstrument = dataUser.user.instruments.map((e) => e.name);
        const formattedInstrumentList = userInstrument.join(', ');
        setInstrument(formattedInstrumentList);
        setInstrumentList(userInstrument);

        if( Object.keys(response[0]).includes('course')){
          const allDatas = response.map(e => {
            return {
              id : e.id,
              createdAt: e.createdAt,
              percentageWatched: e.percentageWatched,
              courses:e.course
            }
          });
          const updatedCourses = [...courses, ...allDatas];
          setCourses(updatedCourses);
        }

        setIsLoading(false);
          
      } catch (error) {
          console.error(error);
      }
    }

    if(userId && userId !== undefined && userId !== null && count === 0 && Object.values(courses).length === 0 ){
      setCount((count) => count + 1);
      displayCourse();
    }
  }, [userId,userAPI,courseAPI,allUsersInfos ,instrument, count , courses ,setUsername]);


  return (
    <div className="global-container-personal-space">
      
      { canUpdateUser && (
          <UpdateUsers 
            firstName={allUsersInfos.firstName}  
            lastName={allUsersInfos.lastName} 
            email={allUsersInfos.email}  
            userId={userId}
            roles={allUsersInfos.role[0]}
            instrument={instrumentList} 
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
