import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Offers.scss';
import SubscriptionCard from '../../components/SubscriptionCard/SubscriptionCard';
import { AuthContext } from "../../contexts/AuthContextProvider";
import { useAPIContext } from "../../contexts/APIContextProvider";

const Offers = () => {

  const {subscriptionAPI} = useAPIContext();
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const { userId , userAPI } = useContext(AuthContext);
  const [userSubscription, setUserSubscription] = useState(null);
  const userInt = parseInt(userId);

  const displayData = useCallback(async () => {
    try {
      const response = await subscriptionAPI.showAll();
      setSubscriptions(response);
    } catch (error) {
      console.error(error);
    }
  },[subscriptionAPI])

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await userAPI.show(userInt);
        setUserSubscription(response?.data?.subscription);
      } catch (error) {
        console.error(error);
      }
    }
    displayData();

    if(  userId && userId !== null ){
      setUserSubscription(selectedSubscription);
      fetchUserData();
    }

  }, [selectedSubscription , userId, userAPI,displayData ,userInt ,subscriptionAPI]);
    
  const handleSelectSubscription = async (selectedSubscription) => {
    setSelectedSubscription(selectedSubscription);

    try {
      const response = await userAPI.updateUser(`/users/${userId}/edit`, {
        subscription: selectedSubscription,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return(
    <div className='offers-list'>

      <h3>Choisissez votre offre</h3>
      
      <div className="subscription-card-container">
          {subscriptions.map((subscription, index) => (
            <SubscriptionCard 
            key={index} subscription={subscription} 
            onSelectSubscription={handleSelectSubscription}
            isUserSub={userSubscription && userSubscription.id === subscription.id}/>
          ))}
      </div>
    </div>
  )
};

Offers.propTypes = {};

Offers.defaultProps = {};

export default Offers;
