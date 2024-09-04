import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Message } from "../../../Components/Message";
import { url } from "../../../Address/BaseUrl";
import { Spin, Tag } from "antd";
import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import UploadTemplate from "../../../Components/UploadTemplate";

function MDCCForm() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  var result;

  const onSubmit = (values) => {
    if (
      (values.doc1 || values.doc2) &&
      values.test_dt &&
      values.item_no &&
      values.qty && values.qty>0 &&
      values.status &&
      values.po_no
    ) {
      const formData = new FormData();
      setLoading(true);
      axios
        .post(url + "/api/addmdcc", {
          user: localStorage.getItem("email"),
          id: +params.id,
          test_dt: values.test_dt,
          item_id: values.item_no,
          item: values.item_no,
          comments: values.comments,
          quantity: values.qty,
          status: values.status,
          po_no: values.po_no,
        })
        .then((res) => {
          console.log(res);

          formData.append("mdcc_no", res.data.lastID);
          formData.append("user", localStorage.getItem("email"));
          formData.append("item_id", values.item_no);
          formData.append("po_no", values.po_no);

          if (values.doc1) formData.append("docs1", values.doc1);
          if (values.doc2) formData.append("docs2", values.doc2);

          axios
            .post(url + "/api/add_mdcc_files", formData)
            .then((resProjFile) => {
              setLoading(false);

              if (resProjFile.data.suc > 0) {
                Message("success", res.data.msg);
                if (+params.id == 0) navigate(-1);
              } else {
                Message("error", res.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              navigate("/error" + "/" + err.code + "/" + err.message);
            });
        });
    }
    console.log(result);
  };

  return (
    <Spin
      indicator={<LoadingOutlined spin />}
      size="large"
      className="text-green-900 dark:text-gray-400"
      spinning={loading}
    >
      <UploadTemplate
        flag={"M"}
        title={"Upload MDCC"}
        onSubmit={(values) => onSubmit(values)}
      />
    </Spin>
  );
}

export default MDCCForm;
