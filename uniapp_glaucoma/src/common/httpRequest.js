import configdata from './config'
import cache from './cache'

module.exports = {
	config: function(name) {
		var info = null;
		if (name) {
			var name2 = name.split("."); //字符分割
			if (name2.length > 1) {
				info = configdata[name2[0]][name2[1]] || null;
			} else {
				info = configdata[name] || null;
			}
			if (info == null) {
				let web_config = cache.get("web_config");
				if (web_config) {
					if (name2.length > 1) {
						info = web_config[name2[0]][name2[1]] || null;
					} else {
						info = web_config[name] || null;
					}
				}
			}
		}
		return info;
	},
	post: function(url, data, header) {
		header = header || "application/json;charset=utf-8";
		url = this.config("APIHOST") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"Content-Type": header,
						"Authorization": "Bearer " + token
					},
					success: function(result) {
						if (result.data.code == 401) {
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/loading/loading'
								})
							}, 1500)

						} else {
							//console.error(result.data)
							succ.call(self, result.data)
						}

					},
					fail: function(e) {
						uni.showToast({
							title: '请检查网络是否链接',
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: '请检查网络是否链接',
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		}
	},
	put: function(url, data, header) {
		header = header || "application/json;charset=utf-8";
		url = this.config("APIHOST") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "PUT",
					header: {
						"Content-Type": header,
						"Authorization": "Bearer " + token
					},
					success: function(result) {
						if (result.data.code == 401) {
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/loading/loading'
								})
							}, 1500)
	
						} else {
							//console.error(result.data)
							succ.call(self, result.data)
						}
	
					},
					fail: function(e) {
						uni.showToast({
							title: '请检查网络是否链接',
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "POST",
					header: {
						"content-type": header
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: '请检查网络是否链接',
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		}
	},
	del: function(url, data, header) {
		header = header || "application/json;charset=utf-8";
		url = this.config("APIHOST") + url;
		let token = uni.getStorageSync("token");
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "DELETE",
					header: {
						"Content-Type": header,
						"Authorization": "Bearer " + token
					},
					success: function(result) {
						if (result.data.code == 401) {
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/loading/loading'
								})
							}, 1500)
	
						} else {
							//console.error(result.data)
							succ.call(self, result.data)
						}
	
					},
					fail: function(e) {
						uni.showToast({
							title: '请检查网络是否链接',
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		} else {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "DELETE",
					header: {
						"content-type": header
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: '请检查网络是否链接',
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
		}
	},
	uploadFile: function(url, data) {
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					'Content-Type': 'multipart/form-data'
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title: '请检查网络是否链接',
						icon: 'none'
					})
					error.call(self, e)
				}
			})
		})
	},

	login: function(url, data, header) {
		let token = uni.getStorageSync("token");
		header = header || "application/x-www-form-urlencoded ; charset=UTF-8";
		url = this.config("APIHOST") + url;
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'equipment': 'mobile'
				},
				success: function(result) {
					succ.call(self, result.data)
				},
				fail: function(e) {
					uni.showToast({
						title: '请检查网络是否链接',
						icon: 'none'
					})
					error.call(self, e)
				}
			})
		})
	},

	get: function(url, data, header) {
		let token = uni.getStorageSync("token");
		// console.log(token)
		header = header || 'application/json;charset=utf-8';
		url = this.config("APIHOST") + url;
		if (token) {
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header,
						"Authorization": "Bearer " + token
					},
					success: function(result) {
			
						if (result.statusCode == 401) {
			
							uni.reLaunch({
								url: '/pages/loading/loading'
							})
						} else {
							//console.error(result.data)
							succ.call(self, result.data)
						}
					},
			
					fail: function(e) {
						uni.showToast({
							title: '请检查网络是否链接',
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
			
		} else{
			return new Promise((succ, error) => {
				uni.request({
					url: url,
					data: data,
					method: "GET",
					header: {
						"content-type": header
					},
					success: function(result) {
						succ.call(self, result.data)
					},
					fail: function(e) {
						uni.showToast({
							title: '请检查网络是否链接',
							icon: 'none'
						})
						error.call(self, e)
					}
				})
			})
			
		}
		
	}
};
