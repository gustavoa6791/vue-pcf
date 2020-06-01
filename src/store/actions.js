let actions = {
    fetchProfileType({ commit }) {
        axios.get('http://localhost:8000/api/profileType')
            .then(res => {
                commit('FETCH_PROFILE_TYPE', res.data)
            }).catch(err => {
                console.log(err)
            })
    },
    createProfileType({ commit }, pt) {
        return axios.post('http://localhost:8000/api/profileType', pt)
            .then(res => {
                commit('CREATE_PROFILE_TYPE', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    editProfileType({ commit }, pt) {
        return axios.put(`http://localhost:8000/api/profileType/${pt.id}`, pt)
            .then(res => {
                commit('EDIT_PROFILE_TYPE', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    deleteProfileType({ commit }, pt) {
       return axios.delete(`http://localhost:8000/api/profileType/${pt.id}`)
            .then(res => {
                if (res.data === 'delete'){
                    commit('DELETE_PROFILE_TYPE', pt)
                }
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },
    deleteVerifyProfileType({ commit }, pt) {
        return axios.delete(`http://localhost:8000/api/profileType/verify/${pt.id}`)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },


    fetchSlotType({ commit }) {
        axios.get('http://localhost:8000/api/slotType')
            .then(res => {
                commit('FETCH_SLOT_TYPE', res.data)
            }).catch(err => {
                console.log(err)
            })
    },    
    createSlotType({ commit }, st) {
        return axios.post('http://localhost:8000/api/slotType', st)
            .then(res => {
                commit('CREATE_SLOT_TYPE', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    findSlotType({ commit } , st) {
        return axios.get(`http://localhost:8000/api/slotType/${st}`)
            .then(res => {
                commit('FIND_SLOT_TYPE', res.data)
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },
    editSlotType({ commit }, st) {
        return axios.put(`http://localhost:8000/api/slotType/${st.id}`, st)
            .then(res => {
                commit('EDIT_SLOT_TYPE', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    deleteSlotType({ commit }, st) {
        return axios.delete(`http://localhost:8000/api/slotType/${st.id}`)
            .then(res => {
                if (res.data === 'delete'){
                    commit('DELETE_SLOT_TYPE', st)
                }
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },
    deleteVerifySlotType({ commit }, st) {
        return axios.delete(`http://localhost:8000/api/slotType/verify/${st.id}`)
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },


    fetchService({ commit }) {
        return axios.get('http://localhost:8000/api/service')
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },
    updateService({ commit },services) {
        return axios.put(`http://localhost:8000/api/service/${services[0]}`, {services:services[1]})
            .then(res => {
                commit('UPDATE_SERVICE', res.data)
            }).catch(err => {
                console.log(err)
            })
    },
    deleteService({ commit }, sv) {
        axios.delete(`http://localhost:8000/api/service/${sv.id}`)
            .then(res => {
                if (res.data === 'delete'){
                    commit('DELETE_SERVICE', sv)
                }
            }).catch(err => {
                console.log(err)
            })
    },


    createAttentionType({ commit }, st) {
        return axios.post('http://localhost:8000/api/attentionType', st)
            .then(res => {
                commit('CREATE_ATTENTION_TYPE', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    findAttentionType({ commit } , st) {
        return axios.get(`http://localhost:8000/api/attentionType/${st}`)
            .then(res => {
                commit('FIND_ATTENTION_TYPE', res.data)
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },
    deleteAttentionType({ commit }, at) {
        axios.delete(`http://localhost:8000/api/attentionType/${at.id}`)
            .then(res => {
                if (res.data === 'delete'){
                    commit('DELETE_ATTENTION_TYPE', at)
                }
            }).catch(err => {
                console.log(err)
            })
    }, 
    editAttentionType({ commit }, st) {
        return axios.put(`http://localhost:8000/api/attentionType/${st.id}`, st)
            .then(res => {
                commit('EDIT_ATTENTION_TYPE', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },

    fetchPlanAsegurador({ commit }) {
        return axios.get('http://localhost:8000/api/plan')
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },

    fetchTemplate({ commit }) {
        return axios.get('http://localhost:8000/api/template')
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },

    fetchOrgStructure({ commit }) {
        axios.get('http://localhost:8000/api/orgStructure')
            .then(res => {
                commit('FETCH_ORG_STRUCTURE', res.data)
            }).catch(err => {
                console.log(err)
            })
    },
    createOrgStructure({ commit }, os) {
        return axios.post('http://localhost:8000/api/orgStructure', os)
            .then(res => {
                commit('CREATE_ORG_STRUCTURE', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    editOrgStructure({ commit }, os) {
        return axios.put(`http://localhost:8000/api/orgStructure/${os.id}`, os)
            .then(res => {
                commit('EDIT_ORG_STRUCTURE', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    deleteOrgStructure({ commit }, os) {
        axios.delete(`http://localhost:8000/api/orgStructure/${os.id}`)
            .then(res => {
                if (res.data === 'delete'){
                    commit('DELETE_ORG_STRUCTURE', os)
                }
            }).catch(err => {
                console.log(err)
            })
    }, 
    createAdmission({ commit }, ad) {
        return axios.post('http://localhost:8000/api/admission', ad)
            .then(res => {
                commit('CREATE_ADMISSION', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    editAdmission({ commit }, ad) {
        return axios.put(`http://localhost:8000/api/admission/${ad.id}`, ad)
            .then(res => {
                commit('EDIT_ADMISSION', res.data) 
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    deleteAdmission({ commit }, ad) {
        axios.delete(`http://localhost:8000/api/admission/${ad.id}`)
            .then(res => {
                if (res.data === 'delete'){
                    commit('DELETE_ADMISSION', ad)
                }
            }).catch(err => {
                console.log(err)
            })
    }, 
    createAttention({ commit }, at) {
        return axios.post('http://localhost:8000/api/attention', at)
            .then(res => {
                commit('CREATE_ATTENTION', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    editAttention({ commit }, at) {
        return axios.put(`http://localhost:8000/api/attention/${at.id}`, at)
            .then(res => {
                commit('EDIT_ATTENTION', res.data)
            }).catch(err => {
                console.log(err)
                return err.response.data.errors
            })
    },
    deleteAttention({ commit }, at) {
        axios.delete(`http://localhost:8000/api/attention/${at.id}`)
            .then(res => {
                if (res.data === 'delete'){
                    commit('DELETE_ATTENTION', at)
                }
            }).catch(err => {
                console.log(err)
            })
    }, 
    fetchPermission({ commit }) {
        return axios.get('http://localhost:8000/api/permission')
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err)
            })
    },
    updatePermission({commit}, pm){
        axios.post(`http://localhost:8000/api/permission/`, pm )
            .then(res =>{
                commit('UPDATE_PERMISSION', res.data)
            }).catch(err => {
                console.log(err)
            })
    },
    deletePermission({ commit }, pm) {
        axios.delete(`http://localhost:8000/api/permission/${pm.gbl_org_structure_allow_id}`)
            .then(res => {
                if (res.data === 'delete'){
                    commit('DELETE_PERMISSION', pm)
                }
            }).catch(err => {
                console.log(err)
            })
    }, 

    updatePermissionAttention({commit}, pm){
        axios.post(`http://localhost:8000/api/permissionAttention`, pm )
            .then(res =>{
                commit('UPDATE_PERMISSION_ATTENTION', res.data)
            }).catch(err => {
                console.log(err)
            })
    },
    deletePermissionAttention({ commit }, pm) {
        axios.delete(`http://localhost:8000/api/permissionAttention/${pm.gbl_attention_point_allow_id}`)
            .then(res => {     
         
                if (res.data === 'delete'){
              
                commit('DELETE_PERMISSION_ATTENTION', pm)
                }
            }).catch(err => {
                console.log(err)
            })
    }, 

}

export default actions