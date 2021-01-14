import React from 'react';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  projectId: string;
  bugId: string;
}

const BugsDetailsPage = () => {
  const { projectId, bugId } = useParams<ParamTypes>();

  return (
    <div>
      {projectId} {bugId}
    </div>
  );
};

export default BugsDetailsPage;
