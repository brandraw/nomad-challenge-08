"use client";

import { useFormState } from "react-dom";
import { FormBtn } from "./form-btn";
import { FormInput } from "./form-input";
import { handleAddTweet } from "./actions";

export default function AddTweet() {
  const [state, action] = useFormState(handleAddTweet, null);

  return (
    <div>
      <form action={action} className="space-y-2">
        <FormInput
          name="tweet"
          placeholder="Write Your Tweet..."
          required
          errors={[]}
        />
        <FormBtn label="Add Tweet" />
      </form>
    </div>
  );
}
