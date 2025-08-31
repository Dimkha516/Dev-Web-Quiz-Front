import { useEffect, useState } from "react";

export default function Quiz() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const backendLink = "https://dev-web-quiz.onrender.com/api"

  // Récupérer une question depuis le backend
  useEffect(() => {
    getQuestions();
  },[]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/question")
  //     .then((res) => res.json())
  //     .then((data) => setQuestion(data))
  //     .catch((err) => console.error(err));
  // }, []);

  const getQuestions = () => {
    // fetch("http://localhost:5000/api/question")
    fetch(`${backendLink}/question`)
      .then((res) => res.json())
      .then((data) => setQuestion(data))
      .catch((err) => console.error(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) return;

    // const res = await fetch("http://localhost:5000/api/answer", {
    const res = await fetch(`${backendLink}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: question.id, reponse: answer }),
    });

    const data = await res.json();
    setResult(data);
  };

  const setAllEmpy = () => {
    setQuestion(null);
    setAnswer("");
    setResult(null);
    getQuestions();
    console.log("Données rechargées");
  };

  if (!question) return <p>Chargement...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <p className="mb-4 font-bold">Indice : {question.indice}</p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Votre réponse"
          className="flex-1 border p-2 rounded"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Valider
        </button>

        <button
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => setAllEmpy()}
        >
          Relancer
        </button>
      </form>

      {result && (
        <div className="mt-4">
          {result.correct ? (
            <div className="text-green-600 font-bold">
              ✅ Correct ! {result.apprenant.nom}
              <img
                // src={`http://localhost:5000${result.apprenant.photo}`}
                  src={`https://dev-web-quiz.onrender.com${result.apprenant.photo}`}
                alt={result.apprenant.nom}
                // className="mt-2 w-32 h-32 object-cover rounded-full"
                className="mt-2 w-50 h-50 object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="text-red-600 font-bold">{result.message}</div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Abdou Aziz Diop
 * Abdoulaye Diop
 * Aissata Diop
 */
