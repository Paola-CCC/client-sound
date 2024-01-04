import { useEffect, useCallback } from "react";
import { useAPIContext } from "../contexts/APIContextProvider";


const useAxiosFetchCourse = () => {

    const { courseAPI } = useAPIContext();

    const fetchData = useCallback(async (value) => {
        try {
              if( value !== undefined) {
                const response = await courseAPI.searching(value);
                return response;
              }

          } catch (error) {
            console.error("Error fetching course data:", error);
          }
      },[courseAPI]);

    useEffect(() => {
        fetchData();
      }, [fetchData]);
    
    return { fetchData };
}


const useAxiosFetchApprentissage = () => {

  const { userProgressionAPI } = useAPIContext();

  const fetchDataApprentissage = useCallback(async (value) => {
      try {
            if( value !== undefined) {
              const response = await userProgressionAPI.searchProgressionStudent(value);
              return response;
            }

        } catch (error) {
          console.error("Error fetching apprentissage data:", error);
        }
    },[userProgressionAPI]);

  useEffect(() => {
    fetchDataApprentissage();
    }, [fetchDataApprentissage]);
  
  return { fetchDataApprentissage };
}


const checkEmptyValue = (obj) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== '') {
      return true;
    }
  }
  return false;
}


export { checkEmptyValue , useAxiosFetchCourse , useAxiosFetchApprentissage};