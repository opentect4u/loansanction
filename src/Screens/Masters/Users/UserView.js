import React, { useEffect } from 'react';
import { routePaths } from '../../../Assets/Data/Routes'
import { useLocation } from 'react-router-dom'
import MasterViewTemplate from '../../../Components/MasterViewTemplate';
import { masterheaders } from '../../../Assets/Data/ColumnData';
const UserView = () => {
  const locationpath = useLocation();
  var template =
    locationpath.pathname.split("/")[
      locationpath.pathname.split("/").length - 1
    ];
  var templateData = masterheaders[template];
    return (
      <MasterViewTemplate
      to={routePaths.ADDUSERS}
      templateData={templateData}
      template={template}
      _url={"/api/getuser"}
    />
    )
}

export default UserView