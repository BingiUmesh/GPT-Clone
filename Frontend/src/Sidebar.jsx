import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

export default function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadID,
    setPrevChats,
  } = useContext(MyContext);
  const getAllThreads = async () => {
    try {
      // dev
      // const response = await fetch("http://localhost:8080/api/thread"); 

      //prod
      const response = await fetch("https://gpt-clone-5op8.onrender.com/api/thread")
      const res = await response.json();
      // we need to store threadId,title
      const filterData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filterData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadID(uuidv1());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadID(newThreadId);
    try {
      const response = await fetch(
       // `http://localhost:8080/api/thread/${newThreadId}`
       `https://gpt-clone-5op8.onrender.com/api/thread/${newThreadId}`
      );
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        // `http://localhost:8080/api/thread/${threadId}`,
        `https://gpt-clone-5op8.onrender.com/api/thread/${threadId}`,
        { method: "DELETE" }
      );
      const res = await response.json();
      // console.log(res);

      //updated threads re-rendering
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="sidebar">
        {/* new chat button */}
        <button onClick={createNewChat}>
          <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo" />
          <span>
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
        </button>

        {/* history */}
        <ul className="history">
          {allThreads?.map((thread, idx) => (
            <li
              key={idx}
              onClick={() => changeThread(thread.threadId)}
              className={thread.threadId === currThreadId ? "highlighted" : ""}
            >
              {thread.title}
              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation(); //stop event bubbling
                  deleteThread(thread.threadId);
                }}
              ></i>
            </li>
          ))}
        </ul>

        {/* sign */}
        <div className="sign">
          <p> By Umesh &hearts;</p>
        </div>
      </section>
    </div>
  );
}
