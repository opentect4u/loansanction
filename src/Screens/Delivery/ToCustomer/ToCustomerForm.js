import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Message } from "../../../Components/Message";
import { url } from "../../../Address/BaseUrl";
import { Spin, Tag } from "antd";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UploadTemplate from "../../../Components/UploadTemplate";
import DeliveryFormComp from "../../../Components/DeliveryFormComp";

function ToCustomerForm() {
  return (
    <div>
      <DeliveryFormComp
        flag={"M"}
        title={"Upload MDCC"}
        // onSubmit={(values) => onSubmit(values)}
      />
    </div>
  )
}

export default ToCustomerForm
