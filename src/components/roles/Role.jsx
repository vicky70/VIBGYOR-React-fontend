
import { useEffect, useState } from 'react'
import styles from './Role.module.css'

// ()   !   &&  $
const Role = () => {
    const [roleName, setRoleName] = useState('')
    const [roleDescription, setRoleDescription] = useState('')
    const [roleList, setRoleList] = useState([])
    const [editRole, setEditRole] = useState(null);

    useEffect(() => {
        getRoleList()
    }, [])

    const getRoleList = async () => {
        try{
            const adminToken = localStorage.getItem('adminToken')
            const res = await fetch('https://vicky70.pythonanywhere.com/getRoleList/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${adminToken}`,
                    'Content-Type': 'application/json'
                },
            })
            const data = await res.json()

            if (res.ok){
                setRoleList(data.RolesList)
            }else{
                alert('Something wen\'t wrong.')
            }
        }catch(error){
            alert('Something is wrong with the Network')
        }
    }

    const createNewRole = async () => {
        try{
            const adminToken = localStorage.getItem('adminToken')
            const res = await fetch('https://vicky70.pythonanywhere.com/createRole/', {
                method: 'POST',
                headers: {
                    'Authorization' : `Token ${adminToken}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    role_name : roleName,
                    description : roleDescription
                })
            });

            if(res.ok){
                setRoleName('')
                setRoleDescription('')
                getRoleList()
            }
            else{
                alert('Error Server Fault.')
            }
        }catch(error){
            alert('Something is wrong with your Network')
        }
    }

    const deleteRole = async (id) => {

        // alert("Are You Sure you want to Delete It.")

        const adminToken = localStorage.getItem('adminToken')
        const url = `https://vicky70.pythonanywhere.com/deleteRole/${id}/`
        try{
            const res = await fetch(url, {
                method : 'DELETE',
                headers : {
                    'Authorization' : `Token ${adminToken}`,
                    'Content-Type' : 'application/json'
                },
            })
            if (res.ok){
                getRoleList()
            }
            else{
                alert('Something is wrong with the stupid server.')
            }
        }catch(error){
            alert('Something is wrong with Your Network')
        }
    }

// update
const handleUpdate = async (id) => {
  const adminToken = localStorage.getItem('adminToken');
  console.log("Edit Role Id = ", editRole.role_id)
  try {
    const res = await fetch(`https://vicky70.pythonanywhere.com/updateRole/${editRole.role_id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role_name: editRole.role_name,
        description: editRole.description
      })
    });

    if (res.ok) {
      setEditRole(null);
      getRoleList();
    } 
    else if(res.status === 400){
        alert("Provide a valid choice\n Valid Choices are Admin, Manager, Team Leader, Employee")
    }
    else {
      alert('Update failed');
    }
  } catch (error) {
    alert('Network error during update');
  }
};
// update ends
    return(
        <div className={styles.dashboardContainer}>

            <div className={styles.leftPart}>

                <div className={styles.layoutDept}>
                    <h1>Create New Role </h1>

                    <input className={styles.departmentName} onChange={(e) => setRoleName(e.target.value)} 
                            value={roleName} placeholder='Enter Role Name'>
                    </input>

                    <input className={styles.departmentName} onChange={(e) => setRoleDescription(e.target.value)} 
                            value={roleDescription} placeholder='Enter Role Description'>
                    </input>

                    <button onClick={createNewRole}>Create New Role</button>

                    <p>Note: Only for Admin Use.</p>
                </div>
            </div>
            <div className={styles.rightPart}>
                <table className={styles.deptTable}>
                    <thead>
                        <tr>
                        <th>Sr. No</th>
                        <th>Role Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleList.map((role, index) => (
                        <tr key={role.role_id}>
                            <td>{index + 1}</td>
                            <td>{role.role_name}</td>
                            <td>{role.description}</td>
                            <td>
                            <button onClick={() => setEditRole(role)}  className={styles.edit}>Edit</button>
                            <button onClick={() => deleteRole(role.role_id)} className={styles.delete}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

                    {editRole && (
                        <div className={styles.overlay}>
                            <div className={styles.modal}>
                            <h2>Edit Role</h2>
                            <input
                                type="text"
                                value={editRole.role_name}
                                onChange={(e) =>
                                setEditRole({ ...editRole, role_name: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                value={editRole.description}
                                onChange={(e) =>
                                setEditRole({ ...editRole, description: e.target.value })
                                }
                            />
                            <button onClick={handleUpdate} className={styles.updateBtn}>Update</button>
                            <button onClick={() => setEditRole(null)} className={styles.cancelBtn}>Cancel</button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Role;