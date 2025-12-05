import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api.js";

const emptyForm = {
  text: "",
  option0: "",
  option1: "",
  option2: "",
  option3: "",
  correctIndex: 0, // 0–3, which option is correct
};

const Admin = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const loadQuestions = async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/questions`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load questions:", err);
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "correctIndex" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setSaveError(null);
  };

  const handleEdit = (question) => {
    // question shape from API: { id, text, options, correctAnswer }
    const [o0 = "", o1 = "", o2 = "", o3 = ""] = question.options ?? [];

    const correctIndex = question.options
      ? question.options.indexOf(question.correctAnswer)
      : 0;

    setForm({
      text: question.text ?? "",
      option0: o0,
      option1: o1,
      option2: o2,
      option3: o3,
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
    });
    setEditingId(question.id);
    setSaveError(null);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this question?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/questions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204) {
        throw new Error(`HTTP ${res.status}`);
      }
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete question:", err);
      alert(`Failed to delete question: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError(null);

    const trimmedText = form.text.trim();
    if (!trimmedText) {
      setSaveError("Question text is required.");
      return;
    }

    const optionsRaw = [form.option0, form.option1, form.option2, form.option3];
    const options = optionsRaw.map((o) => o.trim()).filter(Boolean);

    if (options.length < 2) {
      setSaveError("Please provide at least 2 options.");
      return;
    }

    const idx = form.correctIndex;
    if (idx < 0 || idx >= options.length) {
      setSaveError(
        `Correct option index must be between 0 and ${options.length - 1}.`
      );
      return;
    }

    const correctAnswer = options[idx];

    const payload = {
      text: trimmedText,
      category: null, // you can add a category field later
      difficulty: "EASY", // default for now
      options,
      correctAnswer,
    };

    setSaving(true);
    try {
      const url = editingId
        ? `${API_BASE_URL}/api/questions/${editingId}`
        : `${API_BASE_URL}/api/questions`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`HTTP ${res.status} – ${body}`);
      }

      // After save, reload list & reset form
      await loadQuestions();
      resetForm();
    } catch (err) {
      console.error("Failed to save question:", err);
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin">
      <h2>Admin – Questions</h2>

      {loading ? (
        <p>Loading questions…</p>
      ) : loadError ? (
        <p className="feedback feedback--wrong">
          Error loading questions: {loadError}
        </p>
      ) : questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Options</th>
              <th>Correct</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.text}</td>
                <td>
                  {q.options?.map((opt, idx) => (
                    <div key={idx}>
                      {idx}. {opt}
                    </div>
                  ))}
                </td>
                <td>{q.correctAnswer}</td>
                <td>
                  <button
                    type="button"
                    className="next-btn"
                    onClick={() => handleEdit(q)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="next-btn"
                    onClick={() => handleDelete(q.id)}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr style={{ margin: "1.5rem 0" }} />

      <h3>{editingId ? "Edit Question" : "Add New Question"}</h3>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>
            Question text
            <textarea
              name="text"
              value={form.text}
              onChange={handleFormChange}
              rows={2}
            />
          </label>
        </div>

        <div className="admin-form-row">
          <label>
            Option 0
            <input
              type="text"
              name="option0"
              value={form.option0}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Option 1
            <input
              type="text"
              name="option1"
              value={form.option1}
              onChange={handleFormChange}
            />
          </label>
        </div>

        <div className="admin-form-row">
          <label>
            Option 2
            <input
              type="text"
              name="option2"
              value={form.option2}
              onChange={handleFormChange}
            />
          </label>
          <label>
            Option 3
            <input
              type="text"
              name="option3"
              value={form.option3}
              onChange={handleFormChange}
            />
          </label>
        </div>

        <div className="admin-form-row">
          <label>
            Correct option index (0–3)
            <input
              type="number"
              name="correctIndex"
              min="0"
              max="3"
              value={form.correctIndex}
              onChange={handleFormChange}
            />
          </label>
        </div>

        {saveError && (
          <p className="feedback feedback--wrong">Error: {saveError}</p>
        )}

        <div className="admin-form-actions">
          <button type="submit" className="next-btn" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId
                ? "Update Question"
                : "Create Question"}
          </button>
          {editingId && (
            <button
              type="button"
              className="new-btn"
              onClick={resetForm}
              style={{ marginLeft: "0.75rem" }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Admin;
