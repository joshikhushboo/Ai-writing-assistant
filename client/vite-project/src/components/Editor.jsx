
import React, { useState } from "react";
import axios from "axios";
import { usePrivy } from "@privy-io/react-auth";
import {
  FaSpellCheck,
  FaSyncAlt,
  FaCheck,
  FaPencilAlt,
} from "react-icons/fa";
import { SiGrammarly } from "react-icons/si";

const Editor = () => {
  const { getAccessToken } = usePrivy();

  const [text, setText] = useState("");

  const [rephrasedSentences, setRephrasedSentences] = useState([]);
  const [correctedSentences, setCorrectedSentences] = useState([]);

  const [spellCheckedText, setSpellCheckedText] = useState("");
  const [grammarCheckedText, setGrammarCheckedText] = useState("");

  // Rephrase states
  const [selectedStyle, setSelectedStyle] = useState("professional");
  const [isRephrasing, setIsRephrasing] = useState(false);

  // ==============================
  // TEXT CHANGE
  // ==============================

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // ==============================
  // REPHRASE SENTENCE
  // ==============================

  const rephraseSentence = async () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }

    setIsRephrasing(true);

    try {
      const token = await getAccessToken();

      const response = await axios.post(
        "http://localhost:8000/api/analyze",
        {
          sentence: text,
          style: selectedStyle,
        },
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : undefined
      );

      console.log("Rephrase response:", response.data);

      setRephrasedSentences(response.data.rephrasedSentences || []);
    } catch (error) {
      console.error("Error rephrasing sentence:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while rephrasing the sentence."
      );
    } finally {
      setIsRephrasing(false);
    }
  };

  // ==============================
  // ADD CORRECTED SENTENCE
  // ==============================

  const addCorrectedSentence = (sentence) => {
    if (!sentence) return;

    setCorrectedSentences((prev) => [...prev, sentence]);
  };

  // ==============================
  // SPELL CHECK
  // ==============================

  const checkSpelling = async () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }

    try {
      const token = await getAccessToken();

      const response = await axios.post(
        "http://localhost:8000/api/spellcheck",
        { text },
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : undefined
      );

      setSpellCheckedText(response.data.correctedText || "");
    } catch (error) {
      console.error("Error checking spelling:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while checking spelling."
      );
    }
  };

  // ==============================
  // GRAMMAR CHECK
  // ==============================

  const checkGrammar = async () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }

    try {
      const token = await getAccessToken();

      const response = await axios.post(
        "http://localhost:8000/api/grammarcheck",
        { text },
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : undefined
      );

      setGrammarCheckedText(response.data.correctedText || "");
    } catch (error) {
      console.error("Error checking grammar:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while checking grammar."
      );
    }
  };

  // ==============================
  // REPHRASE BUTTON
  // ==============================

  const handleRephraseClick = () => {
    if (!text.trim()) {
      alert("Please enter some text first.");
      return;
    }

    rephraseSentence();
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* =========================
            MAIN EDITOR
        ========================== */}

        <div className="md:col-span-2">

          {/* Writing Area */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              AI Writing Assistant
            </h2>

            <p className="mb-4 text-gray-600">
              Enhance your writing with our advanced AI tools.
            </p>

            {/* Text Editor */}

            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Type your text here..."
              rows={10}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {/* =========================
                ACTION BUTTONS
            ========================== */}

            <div className="flex justify-end mt-4 space-x-4 flex-wrap gap-2">

              <Button
                onClick={checkSpelling}
                icon={<FaSpellCheck />}
              >
                Check Spelling
              </Button>

              <Button
                onClick={checkGrammar}
                icon={<SiGrammarly />}
              >
                Check Grammar
              </Button>

              <Button
                onClick={handleRephraseClick}
                icon={<FaSyncAlt />}
              >
                Rephrase Sentence
              </Button>

            </div>

            {/* =========================
                REPHRASE OPTIONS
            ========================== */}

            <div className="mt-5">
              <div className="flex flex-wrap gap-3">
                {[
                  "professional",
                  "friendly",
                  "casual",
                  "creative",
                ].map((style) => (
                  <label
                    key={style}
                    className="flex items-center text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rephraseStyle"
                      value={style}
                      checked={selectedStyle === style}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="mr-2"
                    />
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </label>
                ))}
              </div>

              {isRephrasing && (
                <p className="mt-3 text-sm text-gray-500">
                  Rephrasing your sentence...
                </p>
              )}
            </div>

          </div>

          {/* =========================
              SPELL & GRAMMAR RESULTS
          ========================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <ResultSection
              title="Spell Checked Text"
              text={spellCheckedText}
              onAccept={() =>
                addCorrectedSentence(spellCheckedText)
              }
              icon={
                <FaSpellCheck className="text-green-500" />
              }
            />

            <ResultSection
              title="Grammar Checked Text"
              text={grammarCheckedText}
              onAccept={() =>
                addCorrectedSentence(grammarCheckedText)
              }
              icon={
                <SiGrammarly className="text-blue-500" />
              }
            />

          </div>

          {/* =========================
              REPHRASED SUGGESTIONS
          ========================== */}

          {rephrasedSentences.length > 0 && (

            <div className="bg-white shadow-lg rounded-lg p-6 my-8">

              <h3 className="text-xl font-semibold mb-4 flex items-center">

                <FaSyncAlt className="mr-2 text-indigo-500" />

                Rephrased Sentences:

              </h3>

              {rephrasedSentences.map((sentence, index) => (

                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-lg last:mb-0"
                >

                  <p className="mb-3">
                    {sentence}
                  </p>

                  <Button
                    onClick={() =>
                      addCorrectedSentence(sentence)
                    }
                    icon={<FaCheck />}
                  >
                    Accept
                  </Button>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* =========================
            CORRECTED SENTENCES SIDEBAR
        ========================== */}

        <div className="md:col-span-1">

          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-8">

            <h3 className="text-xl font-semibold mb-4 flex items-center">

              <FaCheck className="mr-2 text-green-500" />

              Corrected Sentences

            </h3>

            <p className="mb-4 text-gray-600">
              Your approved corrections will appear here.
            </p>

            {correctedSentences.length > 0 ? (

              correctedSentences.map((sentence, index) => (

                <div
                  key={index}
                  className="mb-2 pb-2 border-b border-gray-200 last:border-b-0"
                >
                  <p>{sentence}</p>
                </div>

              ))

            ) : (

              <p className="text-gray-500 italic">
                No corrected sentences yet.
              </p>

            )}

          </div>

        </div>

      </div>
    </div>
  );
};


// ==========================================
// REUSABLE BUTTON
// ==========================================

const Button = ({ onClick, children, icon }) => (

  <button
    type="button"
    onClick={onClick}
    className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center"
  >

    {icon && (
      <span className="mr-2">
        {icon}
      </span>
    )}

    {children}

  </button>

);


// ==========================================
// RESULT SECTION
// ==========================================

const ResultSection = ({
  title,
  text,
  onAccept,
  icon,
}) =>

  text && (

    <div className="bg-white shadow-lg rounded-lg p-6">

      <h3 className="text-xl font-semibold mb-4 flex items-center">

        {icon}

        <span className="ml-2">
          {title}
        </span>

      </h3>

      <p className="mb-4">
        {text}
      </p>

      <Button
        onClick={onAccept}
        icon={<FaCheck />}
      >
        Accept
      </Button>

    </div>

  );


export default Editor;
