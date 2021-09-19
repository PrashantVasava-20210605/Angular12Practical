USE AngularTraining_Assignment
GO

/*


Post 
- Id - Text - Likes - Comments - PostDateTime 
Comments 
- Id - Text - PostId - CommentDateTime 
Likes 
- Id - PostId - LikeDateTime 
SELECT * FROM  Post



*/

CREATE TABLE Post
(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	Content VARCHAR(MAX),
	PostedOn DATETIME,
	ImageFileName VARCHAR(100)
)

CREATE TABLE Comment
(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	PostId INT REFERENCES Post(Id),
	Content VARCHAR(MAX),
	PostedOn DATETIME
)

CREATE TABLE PostLike
(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	PostId INT REFERENCES Post(Id),
	LikedOn DATETIME
)