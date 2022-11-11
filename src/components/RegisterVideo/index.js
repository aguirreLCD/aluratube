import React from "react";
import { StyledRegisterVideo } from "./styles";

// Whiteboarding
// Custom Hook
function useForm(formProps) {
  /*
    ## What the form needs to work? (user type title and url):    
    - access / get the data from state:
        - title;
        - url ;
    - submit the data using onSubmit(); 
    - clear the form;
    - close form; 
  */

  const [values, setValues] = React.useState(formProps.initialValues);

  return {
    values,
    handleChange: (event) => {
      console.log(event.target);
      const value = event.target.value;
      const name = event.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({
        titulo: "",
        url: "",
      });
    },
  };
}

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// function getVideoId(url) {
//     const videoId = url.split("v=")[1];
//     const ampersandPosition = videoId.indexOf("&");
//     if (ampersandPosition !== -1) {
//         return videoId.substring(0, ampersandPosition);
//     }
//     return videoId;
// }


export default function RegisterVideo() {
  const formRegisterVideo = useForm({
    initialValues: { title: "Video Title", url: "https://youtube.." },
  });
  const [formVisible, setFormVisible] = React.useState(true);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisible(true)}>
        +
      </button>
      {/* Ternary Operators */}
      {/* Operadores de Curto-circuito */}
      {/* a condition followed by a question mark (? ), 
      then an expression to execute if the condition is truthy followed by a colon (: ), 
      and finally the expression to execute if the condition is falsy . */}
      {formVisible ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(formRegisterVideo.values);

            setFormVisible(false);
            formRegisterVideo.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisible(false)}
            >
              X
            </button>
            <input
              placeholder="video title"
              name="title"
              value={formRegisterVideo.values.title}
              onChange={formRegisterVideo.handleChange}
            />
            <input
              placeholder="url"
              name="url"
              value={formRegisterVideo.values.url}
              onChange={formRegisterVideo.handleChange}
            />
            <button type="submit">Add video</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
