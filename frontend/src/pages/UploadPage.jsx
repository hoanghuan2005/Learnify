import React, { useState, useRef } from 'react';
import { 
  UploadIcon, 
  FileTextIcon, 
  ImageIcon, 
  VideoIcon, 
  MusicIcon, 
  XIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  FolderOpenIcon
} from 'lucide-react';

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  // Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending' // pending, uploading, success, error
    }));
    setFiles(prev => [...prev, ...newFiles]);
  };

  // chọn file = input
  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="size-5" />;
    if (fileType.startsWith('video/')) return <VideoIcon className="size-5" />;
    if (fileType.startsWith('audio/')) return <MusicIcon className="size-5" />;
    return <FileTextIcon className="size-5" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    let isCancelled = false;
    for (const file of pendingFiles) {
      // Simulate upload progress
      setFiles(prev => prev.map(f => f.id === file.id ? { ...f, status: 'uploading' } : f));
      for (let i = 0; i <= 100; i += 10) {
        if(isCancelled) break;

        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [file.id]: i }));
      }

      if(isCancelled) {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, status: 'pending' } : f
        ));
        break;
      }
      
      // Update file status
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'success' } : f
      ));
    }
    
    setUploading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="size-5 text-success" />;
      case 'error':
        return <AlertCircleIcon className="size-5 text-error" />;
      case 'uploading':
        return <div className="loading loading-spinner loading-sm" />;
      default:
        return <div className="size-5" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Upload Files</h1>
          <p className="text-lg opacity-70 max-w-2xl mx-auto">
            Upload your study materials, documents, images, or any files to organize and share with your learning community
          </p>
        </div>

        {/* Upload Area */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-primary bg-primary/5 scale-105' 
                : 'border-base-300 hover:border-primary/50 hover:bg-base-100'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <UploadIcon className="size-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {dragActive ? 'Drop files here' : 'Drag & drop files here'}
                </h3>
                <p className="opacity-70">
                  or{' '}
                  <button 
                    className="text-primary hover:underline font-medium"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse files
                  </button>
                  {' '}from your computer
                </p>
              </div>

              <div className="text-sm opacity-60">
                <p>Supports: PDF, DOC, Images, Videos, Audio files</p>
                <p>Maximum file size: 100MB per file</p>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mp3,.wav"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selected Files ({files.length})</h3>
              <button 
                className="btn btn-primary btn-sm"
                onClick={simulateUpload}
                disabled={uploading || files.every(f => f.status === 'success')}
              >
                {uploading ? 'Uploading...' : 'Start Upload'}
              </button>
            </div>

            <div className="space-y-3">
              {files.map((file) => (
                <div key={file.id} className="card bg-base-200 hover:shadow-md transition-all duration-300">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium truncate">{file.name}</h4>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(file.status)}
                            <button
                              onClick={() => removeFile(file.id)}
                              className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                            >
                              <XIcon className="size-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm opacity-70">
                          <span>{formatFileSize(file.size)}</span>
                          <span className="capitalize">{file.type.split('/')[1]}</span>
                        </div>

                        {/* Progress Bar */}
                        {file.status === 'uploading' && (
                          <div className="w-full bg-base-300 rounded-full h-2 mt-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.id] || 0}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Summary */}
        {files.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <FolderOpenIcon className="size-8" />
                </div>
                <div className="stat-title">Total Files</div>
                <div className="stat-value text-primary">{files.length}</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-success">
                  <CheckCircleIcon className="size-8" />
                </div>
                <div className="stat-title">Uploaded</div>
                <div className="stat-value text-success">
                  {files.filter(f => f.status === 'success').length}
                </div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-warning">
                  <UploadIcon className="size-8" />
                </div>
                <div className="stat-title">Pending</div>
                <div className="stat-value text-warning">
                  {files.filter(f => f.status === 'pending').length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 border border-base-300">
            <div className="card-body p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button className="btn btn-outline btn-block">
                  <FileTextIcon className="size-4" />
                  Create Document
                </button>
                <button className="btn btn-outline btn-block">
                  <ImageIcon className="size-4" />
                  Scan Document
                </button>
                <button className="btn btn-outline btn-block">
                  <UploadIcon className="size-4" />
                  Bulk Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;