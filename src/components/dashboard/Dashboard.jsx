
import { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'

// ()   !   &&  $
const Dashboard = () => {
    const [departmentName, setDepartmentName] = useState('')
    const [departmentDescription, setDepartmentDescription] = useState('')
    const [deptList, setDeptList] = useState([])
    const [editDept, setEditDept] = useState(null);

    useEffect(() => {
        getDeptList()
    }, [])

    const getDeptList = async () => {
        try{
            const adminToken = localStorage.getItem('adminToken')
            const res = await fetch('https://vicky70.pythonanywhere.com/getDepartmentList/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${adminToken}`,
                    'Content-Type': 'application/json'
                },
            })
            const data = await res.json()

            if (res.ok){
                setDeptList(data.DepartmentList)
            }else{
                alert('Something wen\'t wrong.')
            }
        }catch(error){
            alert('Something is wrong with the Network')
        }
    }

    const createNewDepartment = async () => {
        try{
            const adminToken = localStorage.getItem('adminToken')
            const res = await fetch('https://vicky70.pythonanywhere.com/createDeparment/', {
                method: 'POST',
                headers: {
                    'Authorization' : `Token ${adminToken}`,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    dept_name : departmentName,
                    description : departmentDescription
                })
            });

            if(res.ok){
                setDepartmentName('')
                setDepartmentDescription('')
                getDeptList()
            }
            else{
                alert('Error Server Fault.')
            }
        }catch(error){
            alert('Something is wrong with your Network')
        }
    }

    const deleteDeparment = async (id) => {

        alert("Are You Sure you want to Delete It.")

        const adminToken = localStorage.getItem('adminToken')
        const url = `https://vicky70.pythonanywhere.com/deleteDepartment/${id}/`
        try{
            const res = await fetch(url, {
                method : 'DELETE',
                headers : {
                    'Authorization' : `Token ${adminToken}`,
                    'Content-Type' : 'application/json'
                },
            })
            if (res.ok){
                getDeptList()
            }
            else{
                alert('Something is wrong with the stupid server.')
            }
        }catch(error){
            alert('Something is wrong with Your Network')
        }
    }

// update
const handleUpdate = async () => {
  const adminToken = localStorage.getItem('adminToken');
  try {
    const res = await fetch(`https://vicky70.pythonanywhere.com/updateDepartment/${editDept.id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${adminToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dept_name: editDept.dept_name,
        description: editDept.description
      })
    });

    if (res.ok) {
      setEditDept(null);
      getDeptList();
    } else {
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
                    <h1>Create New Department </h1>

                    <input className={styles.departmentName} onChange={(e) => setDepartmentName(e.target.value)} 
                            value={departmentName} placeholder='Enter Deparment Name'>
                    </input>

                    <input className={styles.departmentName} onChange={(e) => setDepartmentDescription(e.target.value)} 
                            value={departmentDescription} placeholder='Enter Deparment Description'>
                    </input>

                    <button onClick={createNewDepartment}>Create New Department</button>

                    <p>Note: Only for Admin Use.</p>
                </div>
            </div>
            <div className={styles.rightPart}>
                <table className={styles.deptTable}>
                    <thead>
                        <tr>
                        <th>Sr. No</th>
                        <th>Department Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deptList.map((dept, index) => (
                        <tr key={dept.id}>
                            <td>{index + 1}</td>
                            <td>{dept.dept_name}</td>
                            <td>{dept.description}</td>
                            <td>
                            <button onClick={() => setEditDept(dept)}  className={styles.edit}>Edit</button>
                            <button onClick={() => deleteDeparment(dept.id)} className={styles.delete}>Delete</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

                    {editDept && (
                        <div className={styles.overlay}>
                            <div className={styles.modal}>
                            <h2>Edit Department</h2>
                            <input
                                type="text"
                                value={editDept.dept_name}
                                onChange={(e) =>
                                setEditDept({ ...editDept, dept_name: e.target.value })
                                }
                            />
                            <input
                                type="text"
                                value={editDept.description}
                                onChange={(e) =>
                                setEditDept({ ...editDept, description: e.target.value })
                                }
                            />
                            <button onClick={handleUpdate} className={styles.updateBtn}>Update</button>
                            <button onClick={() => setEditDept(null)} className={styles.cancelBtn}>Cancel</button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Dashboard;