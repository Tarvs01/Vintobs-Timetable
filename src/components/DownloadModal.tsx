import { useRef } from "react";
import ViewTimetable from "./ViewTimetable";
import jsPDF from "jspdf";

function DownloadModal({
  isModalOpen,
}: {
  isModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const viewTimetableRef = useRef<HTMLDivElement>(null);

  function downloadPDF() {
    const pdf = new jsPDF({
      unit: "px",
      orientation: "landscape",
      format: "a4",
    });
    if (viewTimetableRef.current) {
      pdf.html(viewTimetableRef.current, {
        callback: async (pdf) => {
          await pdf.save("timetable.pdf");
        },
        width: 630,
        windowWidth: 600,
      });
    }
  }

  function downloadImage() {
    const json = {
      html: viewTimetableRef.current?.outerHTML,
      css: `.tt-head{
        display: flex;
        justify-content: center;
        margin: 20px;
        align-items: center;
      }
      
      .tt-head img{
        width: 70px;
        height: 70px;
        display: block;
        margin-right: 30px;
      }
      
      table{
        border: 1px solid gray;
        width: 100%;
        border-collapse: collapse;
      }
      
      td, th{
        border: 1px solid gray;
        width: 25%;
        text-align: center;
        padding: 10px;
      }
      
      .timetable-viewer-cont td{
        font-size: 16px;
      }
      
      .timetable-viewer-cont th{
        font-size: 20px;
      }
      
      .timetable-viewer{
        background-color: white;
        width: 100%;
      }
      
      .timetable-heading h1, .timetable-heading h3{
        text-align: center;
        font-family: var(--nunito-font);
      }
      
      .timetable-heading h1{
        margin: 10px;
      }
      
      .timetable-heading h3{
        margin-bottom: 20px;
      }`,
    };

    const username = "d489f82c-f3b3-40e4-add6-1ad2008097cf";
    const password = "d196f4f7-4a96-43a3-80ef-4ece702b7539";

    const options = {
      method: "POST",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    };

    fetch("https://hcti.io/v1/image", options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then((data) => {
        // Image URL is available here
        //console.log(data.url);

        const link = document.createElement("a");
        document.documentElement.append(link);

        fetch(data.url)
          .then((res) => res.blob()) // Gets the response and returns it as a blob
          .then((blob) => {
            const objectURL = URL.createObjectURL(blob);

            // Set the download name and href
            link.setAttribute("download", `image_.jpg`);
            link.href = objectURL;

            // Auto click the link
            link.click();
          })
          .catch((error) => {
            alert(
              "There was an error. Please check your network settings and try again"
            );
            console.log(error);
          });
      })
      .catch((err) => {
        console.error(err);
        alert(
          "There was an error. Please check your network settings and try again"
        );
      });
  }

  return (
    <div className="download-modal-cont">
      <div className="cancel-cont">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 256 256"
          enableBackground="new 0 0 256 256"
          onClick={() => isModalOpen(false)}
        >
          <g>
            <g>
              <path
                fill="#000000"
                d="M159.8,128l79.6-79.6c8.8-8.8,8.8-23,0-31.8c-8.8-8.8-23-8.8-31.8,0L128,96.2L48.4,16.6c-8.8-8.8-23-8.8-31.8,0c-8.8,8.8-8.8,23,0,31.8L96.2,128l-79.6,79.6c-8.8,8.8-8.8,23,0,31.8c8.8,8.8,23,8.8,31.8,0l79.6-79.6l79.6,79.6c8.8,8.8,23,8.8,31.8,0s8.8-23,0-31.8L159.8,128z"
              />
            </g>
          </g>
        </svg>
      </div>
      <h1>Download the Timetable</h1>
      <p>
        The timetable has been generated, choose any of the following options to
        download the file
      </p>

      <div className="download-images">
        <img
          src="/images/PDF File.png"
          alt="download pdf"
          onClick={downloadPDF}
        />
        <img
          src="/images/Image File.png"
          alt="download img"
          onClick={downloadImage}
        />
      </div>

      <div style={{ height: 0, overflow: "hidden" }}>
        <ViewTimetable elementRef={viewTimetableRef} />
      </div>
    </div>
  );
}

export default DownloadModal;
