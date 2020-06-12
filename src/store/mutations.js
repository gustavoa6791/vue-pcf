let mutations = {
    CREATE_PROFILE_TYPE(state, pt) {
        state.profileTypes.unshift(pt)
    },
    FETCH_PROFILE_TYPE(state, pt) {
        return state.profileTypes = pt
    },
    SEARCH_PROFILE_TYPE(state, pt) {
        return state.profileTypes = pt
    },
    DELETE_PROFILE_TYPE(state, pt) {
        let index = state.profileTypes.findIndex(item => item.id === pt.id)
        state.profileTypes.splice(index, 1)
    },
    EDIT_PROFILE_TYPE(state, pt){
        let index = state.profileTypes.findIndex(item => item.id === pt.id)
        state.profileTypes.splice(index, 1, pt)
    },


    CREATE_SLOT_TYPE(state, st) {
        state.slotTypes.unshift(st)
    },
    FETCH_SLOT_TYPE(state, st) {
        return state.slotTypes = st
    },
    FIND_SLOT_TYPE(state, st) {
        return state.slotTypesDetails = st[0]
    },
    DELETE_SLOT_TYPE(state, st) {
        let index = state.slotTypes.findIndex(item => item.id === st.id)
        state.slotTypes.splice(index, 1)
    },
    EDIT_SLOT_TYPE(state, st){
        state.slotTypesDetails = st
    },

    
    CREATE_ATTENTION_TYPE(state, st) {
        state.attentionTypes.unshift(st)
    },
    FIND_ATTENTION_TYPE(state, st) {
        return state.attentionTypes = st
    },
    DELETE_ATTENTION_TYPE(state, at){
        let index = state.attentionTypes.findIndex(item => item.id === at.id)
        state.attentionTypes.splice(index, 1)

    },
    EDIT_ATTENTION_TYPE(state, at){
        let index = state.attentionTypes.findIndex(item => item.id === at.id)
        state.attentionTypes.splice(index, 1, at)
    },

    UPDATE_SERVICE(state, sv){
        let index = state.attentionTypes.findIndex(item => item.id == sv[0])
        sv[1].forEach(element => {
            state.attentionTypes[index]['services'].push( element)
        });
    },
    DELETE_SERVICE(state, sv) {
        let index = state.attentionTypes.findIndex(item => item.id === sv.idatt)
        let indexSV = state.attentionTypes[index]['services'].findIndex(item => item.id === sv.id)
        state.attentionTypes[index]['services'].splice(indexSV, 1)
    },

    FETCH_ORG_STRUCTURE(state, os) {
        return state.orgStructure = os
    },
    CREATE_ORG_STRUCTURE(state, os) {
        state.orgStructure.unshift(os)
    },
    EDIT_ORG_STRUCTURE(state, os){
        let index = state.orgStructure.findIndex(item => item.id === os.id)
        state.orgStructure.splice(index, 1, os)
    },
    DELETE_ORG_STRUCTURE(state, os) {
        let index = state.orgStructure.findIndex(item => item.id === os.id)
        state.orgStructure.splice(index, 1)
    },


    CREATE_ADMISSION(state, ad) {
        let index = state.orgStructure.findIndex(item => item.id === ad.gbl_org_structure_id)
        state.orgStructure[index]['admission'].unshift(ad)
    },
    EDIT_ADMISSION(state, ad){
        let indexS = state.orgStructure.findIndex(item => item.id === ad.gbl_org_structure_id)
        let indexA = state.orgStructure[indexS]['admission'].findIndex(item => item.id === ad.id)
        state.orgStructure[indexS]['admission'].splice(indexA, 1, ad)
    },
    DELETE_ADMISSION(state, ad){
        let indexS = state.orgStructure.findIndex(item => item.id === ad.gbl_org_structure_id)
        let indexA = state.orgStructure[indexS]['admission'].findIndex(item => item.id === ad.id)
        state.orgStructure[indexS]['admission'].splice(indexA, 1)
    },
    CREATE_ATTENTION(state, at) {
        let indexS = state.orgStructure.findIndex(item => item.id === at.gbl_org_structure_id)
        let indexA = state.orgStructure[indexS]['admission'].findIndex(item => item.id === at.gbl_admission_point_id)
        state.orgStructure[indexS]['admission'][indexA]['attention'].unshift(at)
    },
    EDIT_ATTENTION(state, at){
        let indexS = state.orgStructure.findIndex(item => item.id === at.gbl_org_structure_id)
        let indexA = state.orgStructure[indexS]['admission'].findIndex(item => item.id === at.gbl_admission_point_id)
        let indexAT = state.orgStructure[indexS]['admission'][indexA]['attention'].findIndex(item => item.id === at.id)
        state.orgStructure[indexS]['admission'][indexA]['attention'].splice(indexAT, 1, at)
    },
    DELETE_ATTENTION(state, at){
        let indexS = state.orgStructure.findIndex(item => item.id === at.gbl_org_structure_id)
        let indexA = state.orgStructure[indexS]['admission'].findIndex(item => item.id === at.gbl_admission_point_id)
        let indexAT = state.orgStructure[indexS]['admission'][indexA]['attention'].findIndex(item => item.id === at.id)
        state.orgStructure[indexS]['admission'][indexA]['attention'].splice(indexAT, 1)
    },

    UPDATE_PERMISSION(state, pm){
        let index = state.orgStructure.findIndex(item => item.id === pm.id)
        pm.items.forEach(element => {
            state.orgStructure[index]['permission'].push(element)
        });
    },

    DELETE_PERMISSION(state, pm){
        let index = state.orgStructure.findIndex(item => item.id === pm.gbl_org_structure_id)
        let indexP = state.orgStructure[index]['permission'].findIndex(item => item.id === pm.gbl_org_structure_allow_id)
        state.orgStructure[index]['permission'].splice(indexP, 1)
    },

    UPDATE_PERMISSION_ATTENTION(state, pm){
        let index = state.orgStructure.findIndex(item => item.id === pm.attention.gbl_org_structure_id)
        let indexA = state.orgStructure[index]['admission'].findIndex(item => item.id === pm.attention.gbl_admission_point_id)
        let indexAT = state.orgStructure[index]['admission'][indexA]['attention'].findIndex(item => item.id === pm.id)
        pm.items.forEach(element => {
            state.orgStructure[index]['admission'][indexA]['attention'][indexAT]['permission'].push(element)
        });
    }, 
    
    DELETE_PERMISSION_ATTENTION(state, pm){
        
        let index = state.orgStructure.findIndex(item => item.id === pm.attention.gbl_org_structure_id)
        let indexA = state.orgStructure[index]['admission'].findIndex(item => item.id === pm.attention.gbl_admission_point_id)
        let indexAT = state.orgStructure[index]['admission'][indexA]['attention'].findIndex(item => item.id === pm.attention.id)
        let indexP = state.orgStructure[index]['admission'][indexA]['attention'][indexAT]['permission'].findIndex(item => item.id === pm.gbl_attention_point_allow_id)
     
            state.orgStructure[index]['admission'][indexA]['attention'][indexAT]['permission'].splice(indexP, 1)
   
    },

    FETCH_CATALOG_DOCUMENT(state, cd) {
        return state.catalogDocument = cd
    },
    CREATE_CATALOG_DOCUMENT(state, cd) {
        state.catalogDocument.unshift(cd)
    },
    EDIT_CATALOG_DOCUMENT(state, cd){
        let index = state.catalogDocument.findIndex(item => item.id === cd.id)
        state.catalogDocument.splice(index, 1, cd)
    },

}
export default mutations