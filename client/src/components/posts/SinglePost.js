//đây là component Card bootstrap dùng để hiển thị 1 cái post

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

//viết prop như ở dưới để ko cần phải const { _id, status, title, description, url} = post
//hoặc post._id,post.status,... ->đây là móc trực tiếp :))
const SinglePost = ({ post: { _id, status, title, description, url } }) => (
	<Card
		className='shadow'
		border={
			status === 'LEARNED'
				? 'success'
				: status === 'LEARNING'
				? 'warning'
				: 'danger'
		}
	>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<p className='post-title'>{title}</p>
						<Badge
							pill
							variant={
								status === 'LEARNED'
									? 'success'
									: status === 'LEARNING'
									? 'warning'
									: 'danger'
							}
						>
							{status}
						</Badge>
					</Col>
					<Col className='text-right'>
						<ActionButtons url={url} _id={_id} />
					</Col>
				</Row>
			</Card.Title>
			<Card.Text>{description}</Card.Text>
		</Card.Body>
	</Card>
)

export default SinglePost

//đoạn mã trên sau dấu mũi tên =>, tác giả sử dụng () thay vì {}. lý do là do return luôn cái bên trong ngoặc ()

//Những cái gì để trong <Col/> bootstrap thì sẽ dọc nhau
//Những cái gì để trong <Row/> bootstrap thì sẽ ngang nhau