"use client";

import { Heart, MessageCircle } from "lucide-react";
import { useOptimistic, useRef, useState } from "react";
import { FormInput } from "./form-input";
import { FormBtn } from "./form-btn";
import { disLikeTweet, likeTweet } from "./actions";
import { handleComment } from "./communication/actions";

interface CommunicationProps {
  tweetId: number;
  likeStatus: {
    likeCount: number;
    isLiked: boolean;
  };
  comments?: {
    id: number;
    payload: string;
    user: {
      username: string;
    };
  }[];
  username: string;
}

export function Communication({
  tweetId,
  likeStatus: { isLiked, likeCount },
  comments = [],
  username,
}: CommunicationProps) {
  const [isEditting, setIsEditting] = useState(false);
  const [state, reducer] = useOptimistic(
    { isLiked, likeCount },
    (prevState, _) => ({
      isLiked: !prevState.isLiked,
      likeCount: prevState.isLiked
        ? prevState.likeCount - 1
        : prevState.likeCount + 1,
    })
  );

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState("");
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [commentState, commentReducer] = useOptimistic(
    comments,
    (
      prevState,
      payload: { id: number; payload: string; user: { username: string } }
    ) => {
      return [
        {
          id: 0,
          payload: payload.payload,
          user: { username: payload.user.username },
        },
        ...prevState,
      ];
    }
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <button
          onClick={async () => {
            reducer(0);

            !isLiked ? likeTweet(tweetId) : disLikeTweet(tweetId);
          }}
          className="flex items-center gap-x-2"
        >
          <Heart
            className={`size-6 text-red-500 ${
              state.isLiked ? "fill-red-500" : ""
            }`}
          />
          {state.likeCount}
        </button>
        <button onClick={() => setIsEditting((c) => !c)}>
          <MessageCircle className="size-6" />
        </button>
      </div>
      {isEditting && (
        <form
          ref={formRef}
          action={async (formData) => {
            commentReducer({
              id: 0,
              payload: inputValue,
              user: {
                username,
              },
            });

            await handleComment(formData, tweetId);
            if (formRef.current) {
              formRef.current.reset();
            }
            if (inputRef.current) {
              setTimeout(() => {
                inputRef.current?.focus();
              }, 100);
            }
          }}
          className="space-y-2"
        >
          <FormInput
            name="comment"
            required
            type="text"
            placeholder="Let's Comment!"
            autoFocus
            ref={inputRef}
            onChange={onInputChange}
          />
          <FormBtn label="Comment!" />
        </form>
      )}
      <div className="space-y-2">
        {commentState.map((comment) => (
          <div key={comment.id} className="space-y-2 border p-3 rounded-md">
            <div className="text-sm text-muted-foreground">
              {comment.user.username}
            </div>
            <div key={comment.payload}>{comment.payload}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
