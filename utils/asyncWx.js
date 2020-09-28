/**
 * promise 形式 getSetting
 */
export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    })
}

/**
 * promise 形式 chooseAddress
 */
export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    })
}

/**
 * promise 形式 openSetting
 */
export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    })
}

/**
 * promise 形式 showToast
 * @param {object} param0 参数
 */
export const showToast=()=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title:title,
            icon:'none',
            success: (result)=>{
                resolve(result)
            },
            fail: (err)=>{
                reject(err)
            },
            complete: ()=>{}
        });
    })
}