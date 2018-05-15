export default {
	uploadImg(url, filePath, formData) {
		return new Promise((resolve,reject)=>{
			 wx.uploadFile({
	            url: url,
	            filePath: filePath,
	            name: 'file',
	            formData: formData,
	            header: {
	                'content-type': 'multipart/form-data'
	            },
	            success(res) {
	                resolve(res)
	            },
	            fail(res) {
	                wx.showModal({
	                    title: '提示',
	                    content: '上传失败',
	                    showCancel: false
	                })
	            }
	        })
		})
	},
	addimg(){
		return new Promise((resolve,reject) => {
			wx.chooseImage({
				count: 1, 
				sizeType: ['compressed'], 
				sourceType: ['album', 'camera'], 
				success: function (res) {
					resolve(res)
				}
			})
		})
	},
	previewImg(current,urls){
		wx.previewImage({
			current: current, // 当前显示图片的http链接
			urls: urls // 需要预览的图片http链接列表
		})
	}
}
