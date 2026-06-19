import React from "react";
import { notesAPI } from "../services/notesAPI";
import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import AlertBox from "@/components/AlertBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import EmptyState from "@/components/EmptyState";
import GenericTable from "@/components/GenericTable";
import { AiFillDelete } from "react-icons/ai";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    status: "",
  });

  // Handle perubahan nilai input form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await notesAPI.createNote(dataForm);

      setSuccess("Catatan berhasil ditambahkan!");

      // Kosongkan Form setelah Success
      setDataForm({ title: "", content: "", status: "" });

      // Hilangkan pesan Success setelah 3 detik
      setTimeout(() => setSuccess(""), 3000);

      // Panggil Ulang loadNotes untuk refresh data
      loadNotes();
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus catatan ini?")
        if (!konfirmasi) return

        try {
            setLoading(true)
            setError("")
            setSuccess("")

            await notesAPI.deleteNote(id)

            // Refresh data
            loadNotes()
        } catch (err) {
            setError(`Terjadi kesalahan: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await notesAPI.fetchNotes();
      setNotes(data);
    } catch (err) {
      setError("Gagal memuat catatan");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <PageHeader title="Note" breadcrumb="Dashboard / Note" />

      {error && <AlertBox type="error">{error}</AlertBox>}
      {success && <AlertBox type="success">{success}</AlertBox>}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tambah Catatan Baru
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={dataForm.title}
            placeholder="Judul catatan"
            disabled={loading}
            onChange={handleChange}
            required
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          />

          <textarea
            name="content"
            value={dataForm.content}
            placeholder="Isi catatan"
            disabled={loading}
            onChange={handleChange}
            required
            rows="2"
            className="w-full p-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {loading ? "Mohon Tunggu..." : "Tambah Data"}
          </button>
        </form>
      </div>

      {/* List Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
        <div className="px-6 py-4 ">
          <h3 className="text-lg font-semibold">
            Daftar Catatan ({notes.length})
          </h3>
        </div>

        {loading && <LoadingSpinner text="Memuat catatan..." />}

        {!loading && notes.length === 0 && !error && (
          <EmptyState text="Belum ada catatan. Tambah catatan pertama!" />
        )}

        {!loading && notes.length === 0 && error && (
          <EmptyState text="Terjadi Kesalahan. Coba lagi nanti." />
        )}

        {!loading && notes.length > 0 ? (
          <GenericTable
            columns={["#", "Judul", "Isi Catatan", "Aksi"]}
            data={notes}
            renderRow={(note, index) => (
              <>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {index + 1}.
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-emerald-600">
                    {note.title}
                  </div>
                </td>
                <td className="px-6 py-4 max-w-xs">
                  <div className="truncate text-gray-600">{note.content}</div>
                </td>
                <td className="px-6 py-4 max-w-xs">
	              <div className="truncate text-gray-600">
	                  <button
	                      onClick={() => handleDelete(note.id)}
	                      disabled={loading}
	                  >
	                      <AiFillDelete className="text-red-400 text-2xl hover:text-red-600 transition-colors" />
	                  </button>
	              </div>
	          </td>
              </>
            )}
          />
        ) : null}
      </div>
    </div>
  );
}
