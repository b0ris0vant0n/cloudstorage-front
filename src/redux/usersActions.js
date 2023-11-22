import { fetchUsersSuccess, fetchUsersFailure } from './usersReducers';

export const fetchUsers = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('authorization');
        console.log(token)
        const response = await fetch('http://127.0.0.1:8000/api/users/get-users', {
          headers: {
            'Authorization': token,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data)
        dispatch(fetchUsersSuccess(data));
      } catch (error) {
        dispatch(fetchUsersFailure(error.message));
      }
    };
  };

export const registerUser = async (formData) => {
    try {
      const requestData = {
        user: {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        },
        full_name: formData.fullName,
        is_admin: false,
        storage_path: `storage/${formData.username}/`,
        email: formData.email,
      };
  
      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error) {
          return { success: false, error: errorData.error };
        } else {
          return { success: false, error: 'Произошла ошибка при регистрации' };
        }
      } else {
        console.log('User registered successfully');
        return { success: true };
      }
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, error: 'An unexpected error occurred during registration.' };
    }
  };
  
export default registerUser;
  

export const login = async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('authorization', userData.authorization);
        localStorage.setItem('currentuser', userData.currentuser);
        localStorage.setItem('isAdmin', userData.isAdmin)
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'An unexpected error occurred during login.' };
    }
  };
  

export const logout = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('authorization');
  
        const response = await fetch('http://127.0.0.1:8000/api/users/logout', {
          method: 'GET',
          headers: {
            'Authorization': token,
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error logging out: ${response.statusText}`);
        }
  
        dispatch({ type: 'LOGOUT_SUCCESS' });
        localStorage.removeItem('authorization');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    };
  };

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('authorization');
      const response = await fetch(`http://127.0.0.1:8000/api/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('User deleted successfully:', data);
      dispatch(fetchUsers());
    } catch (error) {
      console.error('User deleting file:', error.message);
    }
  }
};
