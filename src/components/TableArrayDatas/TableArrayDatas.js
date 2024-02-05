import React from 'react';

const TableArrayDatas = ({arrayOfDatas}) => {


  return (

    <div className='recap-courses'>
      <h4>Vos cours :</h4>

      {  Object.values(arrayOfDatas).length > 0 ?
    
      (
        <table>
          <thead>
            <tr>
              <th>Nom du cours</th>
              <th>Professeurs</th>
              <th>Instruments</th>
              <th>Progression</th>
              <th>Date du cours</th>
            </tr>
          </thead>
          <tbody>
            {arrayOfDatas.map((ligne, index) => (
              <tr key={index}>
                <td>
                  <div className='text-shorted' >
                    {ligne.courses.title}
                  </div>
                </td>
                <td>{ligne.courses.professor.firstName + ' ' + ligne.courses.professor.lastName}</td>
                <td>{ligne.courses.instrument.name}</td>
    
                {ligne.percentageWatched !== null && ligne.percentageWatched !== undefined ? (
                    <td>{ligne.percentageWatched }%</td>
                    ):(
                    <td>Non connu {ligne.percentageWatched }  </td>
                )}
                {ligne.createdAt && ligne.createdAt !== '' && Object.values(ligne.createdAt).length > 0 ? (
                    <td>{ligne.createdAt}</td>
                    ):(
                    <td>Non connu</td>
                )}
      
              </tr>
            ))}
          </tbody>
        </table>
      ): (
        <p>
          Vous ne suivez actuellement aucun cours
        </p>
      ) }

    </div>
  );
};

export default TableArrayDatas;
