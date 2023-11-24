export const authReducer = (state, action) => {
	const {
		type,
		payload: { isAuthenticated, user }
	} = action

	switch (type) {
		case 'SET_AUTH':
			return {
				...state,
				authLoading: false,
				isAuthenticated,
				user
			}
// ...state sử dụng spread operator để sao chép toàn bộ thuộc tính từ state hiện tại vào đối tượng mới. Điều này giữ nguyên tất cả các thuộc tính khác của state mà bạn không cần cập nhật.
// authLoading: false thêm hoặc cập nhật thuộc tính authLoading trong đối tượng mới và đặt giá trị là false.
// isAuthenticated và user là hai thuộc tính khác được thêm hoặc cập nhật trong đối tượng mới, và chúng lấy giá trị từ biến có tên tương ứng.
		default:
			return state
	}
}
