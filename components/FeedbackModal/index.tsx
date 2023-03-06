import { useState } from "react";
import { supabase } from "../../utils/supabase";

type FeedbackModalProps = {
  show: boolean;
  close: any;
};

export default function FeedbackModal({ show, close }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (feedback.length > 0) {
      await supabase.from("feedback").insert([{ feedback, email }]);
    }
    setFeedback("");
    setEmail("");
    close();
  }

  return (
    <div
      className={show ? "relative z-10 mb-[80px]" : "hidden"}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="fixed inset-0 bg-black/[0.6] transition-opacity z-5"></div>
          <form
            onSubmit={handleSubmit}
            className="z-10 relative w-[450px] bg-sidebarBg p-[30px] border-darkLine border-[1px] rounded-2xl"
          >
            <h2 className="text-base">Submit Feedback</h2>
            <img
              alt="Close"
              src="/icons/Close.svg"
              className="cursor-pointer absolute right-0 top-0 m-[24px]"
              onClick={close}
            />
            <textarea
              className="rounded-lg text-xs resize-none w-full my-[14px] h-[120px] p-[12px] bg-transparent relative outline-none border-darkLine border-[1px]"
              placeholder="Share comments, feedback, suggestions..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <input
              className="rounded-lg text-xs h-[40px] p-[12px] mb-[20px] w-full bg-transparent relative outline-none border-darkLine border-[1px]"
              placeholder="Enter your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white border-darkLine border-[1px] rounded-lg w-full h-[40px] text-sidebarBg"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
