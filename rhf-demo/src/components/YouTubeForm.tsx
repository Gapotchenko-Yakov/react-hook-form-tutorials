import { useForm } from "react-hook-form";

const YouTubeForm = () => {
  const form = useForm();
  const { register } = form;
  const { name, ref, onChange, onBlur } = register("username");

  return (
    <div>
      <h1>YouTube Form</h1>

      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default YouTubeForm;
