'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Font {
  id: string;
  name: string;
  filename: string;
  category: string;
}

export default function AdminDashboard() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{font: Font | null, show: boolean}>({font: null, show: false});
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/verify');
        if (!response.ok) {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      }
    };

    const loadFonts = async () => {
      try {
        const response = await fetch('/api/fonts');
        if (response.ok) {
          const data = await response.json();
          setFonts(data.fonts);
        }
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    checkAuth();
    loadFonts();
    setIsLoading(false);
  }, [router]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.ttf') && !file.name.toLowerCase().endsWith('.otf')) {
      setUploadError('Please upload a valid font file (.ttf or .otf)');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    const formData = new FormData();
    formData.append('font', file);
    formData.append('name', file.name.replace(/\.(ttf|otf)$/i, ''));
    formData.append('category', 'Monlam Classic');

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadSuccess('Font uploaded successfully!');
        // Refresh fonts list from API
        try {
          const fontsResponse = await fetch('/api/fonts');
          if (fontsResponse.ok) {
            const fontsData = await fontsResponse.json();
            setFonts(fontsData.fonts);
          }
        } catch (error) {
          console.error('Error refreshing fonts:', error);
        }
      } else {
        const data = await response.json();
        setUploadError(data.message || 'Upload failed');
      }
    } catch (error) {
      setUploadError('Network error. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFont = async (font: Font) => {
    setDeleteConfirm({font, show: true});
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.font) return;

    setIsDeleting(true);
    try {
      const response = await fetch('/api/admin/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: deleteConfirm.font.filename }),
      });

      if (response.ok) {
        setUploadSuccess(`Font "${deleteConfirm.font.name}" deleted successfully!`);
        // Refresh fonts list
        try {
          const fontsResponse = await fetch('/api/fonts');
          if (fontsResponse.ok) {
            const fontsData = await fontsResponse.json();
            setFonts(fontsData.fonts);
          }
        } catch (error) {
          console.error('Error refreshing fonts:', error);
        }
      } else {
        const data = await response.json();
        setUploadError(data.message || 'Delete failed');
      }
    } catch (error) {
      setUploadError('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeleteConfirm({font: null, show: false});
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({font: null, show: false});
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-indigo-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-2">Manage Monlam Fonts</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
              >
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200/50 p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Upload New Font</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="font-upload" className="block text-sm font-semibold text-slate-700 mb-2">
                Select Font File (.ttf or .otf)
              </label>
              <input
                type="file"
                id="font-upload"
                accept=".ttf,.otf"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            {uploadError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">{uploadError}</p>
              </div>
            )}

            {uploadSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-700 text-sm">{uploadSuccess}</p>
              </div>
            )}

            {isUploading && (
              <div className="flex items-center gap-2 text-indigo-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                <span className="text-sm">Uploading font...</span>
              </div>
            )}
          </div>
        </div>

        {/* Current Fonts */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200/50 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Current Fonts ({fonts.length})</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fonts.map((font) => (
              <div key={font.id} className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800 text-sm truncate pr-2">{font.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      font.category === 'Monlam Classic' ? 'bg-purple-100 text-purple-700' :
                      font.category === 'Monlam Unicode' ? 'bg-blue-100 text-blue-700' :
                      font.category === 'TCRC' ? 'bg-emerald-100 text-emerald-700' :
                      font.category === 'Classic' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {font.category}
                    </span>
                    <button
                      onClick={() => handleDeleteFont(font)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all duration-300"
                      title="Delete font"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-mono truncate">{font.filename}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && deleteConfirm.font && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full border border-red-200/50">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Delete Font</h3>
                  <p className="text-sm text-slate-600">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-slate-700 mb-2">
                  Are you sure you want to delete the font <strong>"{deleteConfirm.font.name}"</strong>?
                </p>
                <p className="text-sm text-slate-500">
                  File: <code className="bg-slate-100 px-2 py-1 rounded text-xs">{deleteConfirm.font.filename}</code>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete Font'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
