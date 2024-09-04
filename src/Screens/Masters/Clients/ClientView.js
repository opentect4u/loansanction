import React from 'react'
import { routePaths } from '../../../Assets/Data/Routes'
import { useLocation } from 'react-router-dom'
import MasterViewTemplate from '../../../Components/MasterViewTemplate';
import { masterheaders } from '../../../Assets/Data/ColumnData';

import { Link } from 'react-router-dom'
import {PlusOutlined} from '@ant-design/icons';

const ClientView = () => {
    const locationpath = useLocation();
    var template =
      locationpath.pathname.split("/")[
        locationpath.pathname.split("/").length - 1
      ];
    var templateData = masterheaders[template];
  return (
    <MasterViewTemplate
    to={routePaths.ADDCLIENTS}
    templateData={templateData}
    template={template}
    _url={"/api/getclient"}
  />
    
  )
}

export default ClientView