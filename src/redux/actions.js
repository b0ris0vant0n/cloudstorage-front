import { fetchFilesSuccess, fetchFilesFailure } from './reducers';

export const fetchFiles = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('authorization');
  
        const response = await fetch('http://127.0.0.1:8000/api/files/get-files/', {
          headers: {
            'Authorization': token,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching files: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data)
        dispatch(fetchFilesSuccess(data));
      } catch (error) {
        dispatch(fetchFilesFailure(error));
      }
    };
  };


export const uploadFile = (formData) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('authorization');
  
        const response = await fetch('http://127.0.0.1:8000/api/files/upload/', {
          method: 'POST',
          headers: {
            'Authorization': token,
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Error uploading file: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log('File uploaded successfully:', data);
        dispatch(fetchFiles());
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    };
  };
  
  export const downloadFile = (fileId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('authorization');
        const response = await fetch(`http://127.0.0.1:8000/api/files/download/${fileId}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error downloading file: ${response.statusText}`);
        }
        const blob = await response.blob();

        const contentDispositionHeader = response.headers.get('Content-Disposition');
        let filename;

        if (contentDispositionHeader) {
          if (contentDispositionHeader.includes('=?utf-8?b?')) {
            const base64Encoded = contentDispositionHeader.split('=?utf-8?b?')[1].split('?=')[0];
            const contentDispositionHeaderDecode = new TextDecoder().decode(new Uint8Array(atob(base64Encoded).split('').map(c => c.charCodeAt(0))));;
            filename = contentDispositionHeaderDecode.split(';')[1].trim().replace('filename=', '');
          } else {
            filename = contentDispositionHeader.split(';')[1].trim().replace('filename=', '');
          }
        } else {
          filename = 'fallback_filename';
          console.warn('Content-Disposition header is missing. Using fallback filename.');
        }
         
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
          
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        } catch (error) {
        console.error('Error downloading file:', error.message);
        }
      console.log('File download successfully') 
      };
      };
  
export const renameFile = (fileId, newName) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('authorization');
      const response = await fetch(`http://127.0.0.1:8000/api/files/rename/${fileId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_name: newName }),
      });

      if (!response.ok) {
        throw new Error(`Error renaming file: ${response.statusText}`);
      }

      dispatch(fetchFiles());

      console.log('File renamed successfully');
    } catch (error) {
      console.error('Error renaming file:', error.message);
    }
  };
};

export const changeComment = (fileId, newComment) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('authorization');
      const response = await fetch(`http://127.0.0.1:8000/api/files/comment/${fileId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_comment: newComment }),
      });

      if (!response.ok) {
        throw new Error(`Error change comment: ${response.statusText}`);
      }

      dispatch(fetchFiles());

      console.log('Comment changed successfully');
    } catch (error) {
      console.error('Error changing comment:', error.message);
    }
  };
};