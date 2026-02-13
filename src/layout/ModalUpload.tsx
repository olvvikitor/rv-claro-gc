import { useUploadFile } from "../hooks/uploadFile"
import { X } from "lucide-react"
import React, { useState } from "react"

type UploadModalProps = {
  open: boolean
  onClose: () => void
}

export function UploadModal({ open, onClose }: UploadModalProps) {
  const { enviarFile, loading, data, error } = useUploadFile()
  const [file, setFile] = useState<File | null>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  function handleUpload() {
    if (file) {
      enviarFile(file)
    }
  }

  function removeFile() {
    setFile(null)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="
        bg-white dark:bg-zinc-900
        rounded-xl
        w-[95vw] md:w-[70vw] lg:w-[60vw]
        h-[85vh] md:h-[75vh]
        shadow-2xl
        flex flex-col
      ">

        {/* HEADER */}
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Atualização de RV
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <X size={23} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 overflow-y-auto">

          {!file ? (
            <label
              className="
                w-full h-64
                border-2 border-dashed
                border-gray-300 dark:border-zinc-600
                rounded-lg
                flex flex-col items-center justify-center
                cursor-pointer
                hover:border-green-500
                transition
              "
            >
              <p className="text-gray-600 dark:text-gray-300">
                Clique para selecionar um arquivo .xlsx
              </p>

              <input
                type="file"
                accept=".xlsx"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          ) : (
            <div className="w-full h-64 border-2 border-green-500 rounded-lg flex flex-col items-center justify-center gap-3">
              <p className="text-green-600 font-medium">
                ✅ Arquivo selecionado:
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                {file.name}
              </p>

              <button
                onClick={removeFile}
                className="text-red-500 hover:underline text-sm"
              >
                Remover arquivo
              </button>
            </div>
          )}

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}

          {data && (
            <p className="text-green-500 mt-4">
              Upload realizado com sucesso!
            </p>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-gray-200 dark:border-zinc-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </div>

      </div>
    </div>
  )
}
