/**
   * 
   * @param {* string} formId  模版推送formId
   */
  export default function dealFormIds(formId) {
    let that = this;
    return new Promise((resolve, reject) => {
      let formIds = global.formIds;
      let data = {
        formId: formId,
        expire: parseInt(new Date().getTime() / 1000) + 604800
      };
      formIds.push(data);
      global.formIds = formIds;
      resolve(formIds);
    })
  }
