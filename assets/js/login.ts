import * as Supabase from "@supabase/supabase-js";
import $ from "jquery";

async function login() {
  var email = (<HTMLInputElement>document.getElementById("email")).value;
  if (email == "") {
    // hack because login gets called when clicking on any other button as well
    return;
  }
  var password = (<HTMLInputElement>document.getElementById("password")).value;
  var remember_me = (<HTMLInputElement>document.getElementById("remember_me"))
    .checked;

  // FIXME: What about the remember_me?

  const sup = Supabase.createClient(
    "https://kokulrmhlfxdwuvcmblj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTM3NDY4OSwiZXhwIjoxOTQ2OTUwNjg5fQ.LvaFM84Q00RKkRTyIDjzZAnkzba30bnRhQZQldj1AfU"
  );
  const { user, session, error } = await sup.auth.signIn({
    email: email,
    password: password,
  });
  if (error != null) {
    showError(error.message);
  } else {
    console.log("Success! User: " + JSON.stringify({ user }));
    console.log("Success! Session: " + JSON.stringify({ session }));
    window.location.href = "/account";
  }
}

function showError(message: string) {
  $("#form-error").removeClass("hidden");
  $("#form-error-text").text(message);
}

document.getElementById("login-form").onsubmit = () => {
  login();
  return false;
};
