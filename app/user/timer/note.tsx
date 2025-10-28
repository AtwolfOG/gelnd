"use client";
import Container from "@/components/container";
import TextInput from "@/components/customInput";
import { Accent } from "@/components/accenttext";
import { addNote } from "@/lib/session";
import { useReducer } from "react";
import { IoIosClose } from "react-icons/io";
import { Bounce, toast, ToastContainer } from "react-toastify";

interface StateType {
  title: string;
  text: string;
  tags: string[];
  tag: string;
}
interface ActionType {
  type: "title" | "text" | "add" | "remove" | "tag";
  title?: string;
  text?: string;
  tag?: string;
}
function reducer(prevState: StateType, action: ActionType) {
  switch (action.type) {
    case "title":
      return { ...prevState, title: action.title };
    case "text":
      return { ...prevState, text: action.text };
    case "add":
      return {
        ...prevState,
        tags: [...prevState.tags, prevState.tag.trim()],
        tag: "",
      };
    case "remove":
      const newTags = prevState.tags.filter((val) => val !== action.tag);
      return { ...prevState, tags: newTags };
    case "tag":
      return { ...prevState, tag: action.tag };
  }
}
export function Note() {
  const initialState: StateType = {
    title: "",
    text: "",
    tag: "",
    tags: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  function handleAddTag() {
    if (!state.tag) return;
    const filter = state.tags.find((val) => val == state.tag);
    if (filter)
      return toast.error("Tag is already included", {
        autoClose: 3000,
        position: "top-right",
        closeOnClick: true,
        transition: Bounce,
      });
    dispatch({ type: "add" });
  }
  function handleRemoveTag(text: string) {
    dispatch({ type: "remove", tag: text });
  }
  async function handleSubmit() {
    const { tag, ...note } = state;
    try {
      await addNote(note);
      toast.success("note added", {
        autoClose: 3000,
        closeOnClick: true,
        position: "top-center",
        transition: Bounce,
      });
    } catch (error) {}
  }
  return (
    <div className="max-w-[400px] flex grow">
      <Container>
        <div className="flex flex-col gap-3 py-5 ">
          <div>
            <h2>NOTE</h2>
          </div>
          <div>
            <p>Enter the title</p>
            <TextInput
              placeholder="Enter the title"
              value={state.title}
              onChange={(e) => {
                dispatch({ type: "title", title: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Enter the content</p>
            <textarea
              className="border border-(--border-light) font-[300] text-(--text) px-2 py-1 w-full rounded-lg focus:outline-none"
              placeholder="Enter the text"
              value={state.text}
              onChange={(e) => {
                dispatch({ type: "text", text: e.target.value });
              }}
              rows={2}
            />
          </div>
          <div className="flex gap-2  ">
            <TextInput
              placeholder="Add tag"
              value={state.tag}
              onChange={(e) => dispatch({ type: "tag", tag: e.target.value })}
            />{" "}
            <button
              className="border border-(--border-light) p-1  w-24 rounded-lg text-(--text) hover:bg-(--bg-dark)"
              onClick={handleAddTag}
            >
              Add Tag
            </button>
          </div>
          {state.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {state.tags.map((val, i) => (
                <Tag text={val} handleClick={handleRemoveTag} key={i} />
              ))}
            </div>
          ) : null}
          <button
            className="border border-(--border-light) p-3 rounded-lg text-(--text) hover:bg-(--bg-dark)"
            onClick={handleSubmit}
          >
            ADD NOTE
          </button>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}
function Tag({
  text,
  handleClick,
}: {
  text: string;
  handleClick: (text: string) => void;
}) {
  return (
    <div className="w-max bg-(--border-light) text-(--border-muted) p-1 pl-2 pr-1 rounded-2xl">
      <Accent>{text}</Accent>
      <IoIosClose
        onClick={() => handleClick(text)}
        className="inline text-2xl"
      />
    </div>
  );
}
