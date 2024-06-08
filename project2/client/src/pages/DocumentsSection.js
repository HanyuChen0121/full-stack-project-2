import React, { useState } from 'react';

function DocumentsSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Driver’s License', url: '/docs/drivers-license.pdf' },
    { id: 2, name: 'Work Authorization', url: '/docs/work-authorization.pdf' },
  ]);

  const [newDocument, setNewDocument] = useState({ name: '', url: '' });
  const [originalDocuments, setOriginalDocuments] = useState(documents);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setOriginalDocuments(documents);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    if (window.confirm('Discard all changes?')) {
      setDocuments(originalDocuments);
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDocument({ ...newDocument, [name]: value });
  };

  const handleAddDocument = () => {
    setDocuments([...documents, { ...newDocument, id: documents.length + 1 }]);
    setNewDocument({ name: '', url: '' });
  };

  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
          </li>
        ))}
      </ul>
      {isEditing && (
        <div>
          <input type="text" name="name" value={newDocument.name} onChange={handleChange} placeholder="Document Name" />
          <input type="text" name="url" value={newDocument.url} onChange={handleChange} placeholder="Document URL" />
          <button onClick={handleAddDocument}>Add Document</button>
        </div>
      )}
      {isEditing ? (
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
}

export default DocumentsSection;
