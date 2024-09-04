import React, { useState } from "react";
import TDInputTemplate from "../TDInputTemplate";
import VError from "../../Components/VError";
import { useParams } from "react-router-dom";
function More({ pressNext, pressBack, type,data }) {
  const [insp_flag, setInspFlag] = useState(data.insp_flag?data.insp_flag:"N");
  const [insp, setInsp] = useState(data.insp?data.insp:"");
  const [drawing_flag, setDrawingFlag] = useState(data.drawing_flag?data.drawing_flag:"N");
  const [drawing, setDrawing] = useState(data.drawing?data.drawing:"");
  const [mdcc_flag, setMdccFlag] = useState(data.mdcc_flag?data.mdcc_flag:"N");
  const [mdcc, setMdcc] = useState(data.mdcc?data.mdcc:"");
  const [drawingDate, setDrawingDate] = useState(data.drawingDate?data.drawingDate:'');
  const params = useParams();
 
  const onSubmit = () => {
    console.log(drawingDate);

    if (
      mdcc_flag == "MDCC" ||
      !insp_flag == "Inspection required?" ||
      drawing_flag == "Drawing/Datasheet?" ||
      (mdcc_flag == "Y" && !mdcc) ||
      (insp_flag == "Y" && !insp) ||
      (drawing_flag == "Y" && !drawing)
    ) {
    } else {
      console.log(drawingDate);
      pressNext({
        mdcc_flag: mdcc_flag,
        mdcc: mdcc,
        drawing_flag: drawing_flag,
        drawing: drawing,
        insp_flag: insp_flag,
        insp: insp,
        drawingDate:drawingDate
      });
    }
  };
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        <div className="flex flex-col sm:col-span-1 gap-3 mt-5">
          <TDInputTemplate
            placeholder="MDCC"
            type="text"
            label="MDCC"
            name="mdcc"
            data={[
              { name: "Yes", code: "Y" },
              { name: "No", code: "N" },
            ]}
            formControlName={mdcc_flag}
            handleChange={(e) => {
              setMdccFlag(e.target.value);
              console.log(mdcc_flag)
              localStorage.setItem('mdcc_flag',e.target.value);
            }}
            mode={2}
            disabled={localStorage.getItem('po_status')=='A'?true:false}

          />
          {mdcc_flag == "MDCC" && <VError title={"MDCC is required"} />}
         
        </div>
        <div className="flex flex-col sm:col-span-1 gap-3 mt-5">
          <TDInputTemplate
            placeholder="Inspection required?"
            type="text"
            label="Inspection required?"
            name="insp_flag"
            handleChange={(e) => {
              setInspFlag(e.target.value);
              console.log(insp_flag);
              localStorage.setItem('insp_flag',e.target.value)
            }}
            formControlName={insp_flag}
            data={[
              { name: "Yes", code: "Y" },
              { name: "No", code: "N" },
            ]}
            mode={2}
            disabled={localStorage.getItem('po_status')=='A'?true:false}

          />
          {insp_flag == "Inspection required?" && (
            <VError title={"Inspection flag is required"} />
          )}
         
        </div>
        <div className="flex flex-col sm:col-span-1 gap-3 mt-5">
          <TDInputTemplate
            placeholder="Drawing/Datasheet?"
            type="text"
            label="Drawing/Datasheet?"
            name="drawing"
            data={[
              { name: "Yes", code: "Y" },
              { name: "No", code: "N" },
            ]}
            mode={2}
            disabled={localStorage.getItem('po_status')=='A'?true:false}

            handleChange={(e) => {
              setDrawingFlag(e.target.value);
              console.log(drawing_flag);
              localStorage.setItem('drawing_flag',e.target.value)
            }}
            formControlName={drawing_flag}
          />
          {drawing_flag == "Drawing/Datasheet?" && (
            <VError title={"Drawing/Datasheet flag is required"} />
          )}
          
        </div>
        <div  className="flex flex-col sm:col-span-3 gap-3 mt-5"> 
        {mdcc_flag == "Y" && (
            <TDInputTemplate
              placeholder="MDCC Scope"
              type="text"
              label="MDCC Scope"
              name="mdcc"
              formControlName={mdcc}
              handleChange={(text) => {setMdcc(text.target.value); localStorage.setItem('mdcc',text.target.value)}}
              disabled={localStorage.getItem('po_status')=='A'?true:false}

              mode={3}
            />
          )}
          {mdcc_flag == "Y" && !mdcc && (
            <VError title={"MDCC scope is required"} />
          )} 
         {insp_flag == "Y" && (
            <TDInputTemplate
              placeholder="Inspection Scope"
              type="text"
              formControlName={insp}
              handleChange={(text) => {setInsp(text.target.value);localStorage.setItem('insp',text.target.value)}}
              label="Inspection Scope"
              disabled={localStorage.getItem('po_status')=='A'?true:false}

              name="insp"
              mode={3}
            />
          )}
          {insp_flag == "Y" && !insp && (
            <VError title={"Inspection scope is required"} />
          )}
        {drawing_flag == "Y" && (
            <>
              <TDInputTemplate
                placeholder="Drawing/Datasheet Scope"
                type="text"
                formControlName={drawing}
                handleChange={(e) => {setDrawing(e.target.value);localStorage.setItem('drawing',e.target.value)}}
                label="Drawing/Datasheet Scope"
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                name="drawing"
                mode={3}
              />
              {drawing_flag == "Y" && !drawing && (
                <VError title={"Drawing scope is required"} />
              )}

                <>
                  {" "}
                  <div  className="flex-col justify-between">
                    
                    <TDInputTemplate
                      placeholder=""
                      type="text"
                      formControlName={drawingDate}
                      handleChange={(event) => {setDrawingDate(event.target.value);localStorage.setItem('dt',event.target.value)}}
                      // handleChange={e=>setDrawing(e.target.value)}
                disabled={localStorage.getItem('po_status')=='A'?true:false}

                      label="Drawing submission date"
                      name="dt"
                      mode={3}
                    />
                  </div>
                </>
            </>
          )}
       </div>
      </div>
      <div className="flex pt-4 justify-between w-full">
        <button
          className="inline-flex items-center px-5 py-2.5 mt-4 mr-2 sm:mt-6 text-sm font-medium text-center text-white border border-[#92140C] bg-[#92140C] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 rounded-full  dark:focus:ring-primary-900"
          onClick={pressBack}
        >
          Back
        </button>
        <button
          type="submit"
          className=" disabled:bg-gray-400 disabled:dark:bg-gray-400 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-900 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  rounded-full focus:ring-gray-600  dark:focus:ring-primary-900 dark:bg-[#22543d] dark:hover:bg-gray-600"
          onClick={() => onSubmit()}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default More;
