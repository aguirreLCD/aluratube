import React from "react";
import { StyledRegisterVideo } from "./styles";

import { supabase } from "../../../services/supabaseClient";

// Whiteboarding
// Custom Hook
function useForm(formProps) {
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
      setValues({});
    },
  };
}
// github co-pilot
// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// function getVideoId(url) {
//   const videoId = url.split("v=")[1];
//   const ampersandPosition = videoId.indexOf("&");
//   if (ampersandPosition !== -1) {
//     return videoId.substring(0, ampersandPosition);
//   }
//   return videoId;
// }

export default function RegisterVideo() {
  const formRegisterVideo = useForm({
    initialValues: { title: "title", url: "url" },
  });
  const [formVisible, setFormVisible] = React.useState(true);

  // console.log(supabase);
  // console.log(supabase.from("video"));

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

            supabase
              .from("video")
              .insert({
                title: formRegisterVideo.values.title,
                url: formRegisterVideo.values.url,
                thumbnail: getThumbnail(formRegisterVideo.values.url),
                playlist: "cycling",
              })
              .then((responseSupabase) => {
                console.log(responseSupabase);
              })
              .catch((err) => {
                console.log(err);
              });

            formRegisterVideo.clearForm();
            setFormVisible(false);
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
              placeholder="title"
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
