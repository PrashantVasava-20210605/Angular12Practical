USE AngularTraining_Assignment
GO

/*


Post 
- Id - Text - Likes - Comments - PostDateTime 
Comments 
- Id - Text - PostId - CommentDateTime 
Likes 
- Id - PostId - LikeDateTime 


*/

CREATE TABLE Post
(
	Id INT IDENTITY(1, 1) PRIMARY KEY,
	Content VARCHAR(MAX),
	PostedOn DATETIME,
	ImageBase64 VARCHAR(MAX)
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