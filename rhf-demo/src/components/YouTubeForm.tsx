import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dateOfBirth: Date;
};

const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "John",
      email: "",
      channel: "channel123",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["1234", "9876"],
      phNumbers: [{ number: "4321" }],
      age: 0,
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
  } = form;
  const { errors, touchedFields, dirtyFields, isDirty, isValid } = formState;
  console.log(touchedFields, dirtyFields, isDirty, isValid);

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form is submitted.");
    console.log(data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  const handleGetValues = () => {
    console.log(getValues(["username", "channel"]));
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  renderCount++;
  return (
    <div>
      <h1>YouTube Form {renderCount / 2}</h1>
      {/* <h2>Watched value: {JSON.stringify(watchForm)}</h2> */}

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return fieldValue === "admin@example.com"
                    ? "Enter a different email address"
                    : true;
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: { value: true, message: "Channel is required" },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <input type="text" id="facebook" {...register("social.facebook")} />
        </div>
        <div className="form-control">
          <label htmlFor="primary-phone">PhoneNumbers</label>
          <input
            type="text"
            id="primary-phone"
            {...register("phoneNumbers.0")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="secondary-phone">PhoneNumbers</label>
          <input
            type="text"
            id="secondary-phone"
            {...register("phoneNumbers.1")}
          />
        </div>
        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((field, index) => (
              <div key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number`)} />
                <button type="button" onClick={() => append({ number: "" })}>
                  Add
                </button>
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            step={1}
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: { value: true, message: "Age is required" },
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth", {
              valueAsDate: true,
              required: { value: true, message: "Date of Birth is required" },
            })}
          />
          <p className="error">{errors.dateOfBirth?.message}</p>
        </div>
        <button disabled={!isDirty || !isValid}>Submit</button>
        <button type="button" onClick={handleGetValues}>
          Get values
        </button>
        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
