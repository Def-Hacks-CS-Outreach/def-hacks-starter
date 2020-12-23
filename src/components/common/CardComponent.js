import React, { useState, useEffect } from 'react';
import '../../styles/exist.css';
import '../../styles/dashboard.css';
import { Card, Row, Col } from 'react-bootstrap';
import firebase from '../firebase/base';

function CardComponent() {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const coursesRef = firebase.dbReturn().collection('Courses');
    coursesRef.get().then((querySnapshot) => {
      querySnapshot.forEach((docName) => {
        setCourseList((oldCl) => [
          ...oldCl,
          { name: docName.id, lessons: docName.data().courseJSON },
        ]);
      });
    });
  }, []);

  return (
    <div className="card-container">
      <Row>
        {courseList.map((course) => (
          <Col xs={12} md={6} lg={6}>
            <Card className="card-component">
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <hr style={{ color: 'white' }} />
                <Card.Text>
                  {/* Right now only display the first lesson as default */}
                  <em>Next Lesson: </em> {course.lessons[0]['lesson_name']}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardComponent;
