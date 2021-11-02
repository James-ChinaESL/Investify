export default function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        console.log(e);

        if (e.currentTarget === e.target) {
          console.log("focused self");
        } else {
          console.log("focused child", e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log("focus entered self");
        }
      }}
      onBlur={(e) => {
        console.log(e);

        if (e.currentTarget === e.target) {
          console.log("unfocused self");
        } else {
          console.log("unfocused child", e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log("focus left self");
        }
      }}
    >
      <input id='1' />
      <input id='2' />
    </div>
  );
}
