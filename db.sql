CREATE TABLE user (
	id BIGINT AUTO_INCREMENT NOT NULL
	,email VARCHAR(128) NOT NULL
	,pw_hash VARCHAR(60) NOT NULL

	,PRIMARY KEY(id)
	,INDEX(email)
);

CREATE TABLE user__role (
	id BIGINT AUTO_INCREMENT NOT NULL
	,user_id BIGINT NOT NULL
	,node VARCHAR(255) NOT NULL

	,PRIMARY KEY(id)
	,INDEX(user_id)
);

CREATE TABLE user__org__membership (
	id BIGINT AUTO_INCREMENT NOT NULL
	,user_id BIGINT NOT NULL
	,org_id BIGINT NOT NULL

	,PRIMARY KEY(id)
	,INDEX(user_id, org_id)
	,INDEX(org_id)
);

CREATE TABLE org (
	id BIGINT AUTO_INCREMENT NOT NULL
	,name VARCHAR(128) NOT NULL
	--,subdomain VARCHAR(128) NOT NULL

	,PRIMARY KEY(id)
	--,INDEX(subdomain)
);

CREATE TABLE sprint (
	id BIGINT AUTO_INCREMENT NOT NULL
	,org_id BIGINT NOT NULL
	,is_active BOOL NOT NULL DEFAULT FALSE
	,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	,updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

	,PRIMARY KEY(id)
	,INDEX(org_id)
);

CREATE TABLE task__sprint__membership (
	id BIGINT AUTO_INCREMENT NOT NULL
	,task_id BIGINT NOT NULL
	,sprint_id BIGINT NOT NULL
	,assignee__user_id BIGINT NOT NULL
	,ordering INT NOT NULL

	,PRIMARY KEY(id)
	-- it's going to be more expensive to get all the tasks in a sprint to get an individual task or set of tasks sprint, so i'm ok leaving the index in that case
	,INDEX(sprint_id, task_id)
	-- ,INDEX(assignee__user_id, sprint_id)
	,INDEX(task_id)
);

CREATE TABLE task (
	id BIGINT AUTO_INCREMENT NOT NULL
	,description TEXT NOT NULL
	,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	,updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

	,PRIMARY KEY(id)
);

CREATE TABLE task__comments (
	id BIGINT AUTO_INCREMENT NOT NULL
	,user_id BIGINT NOT NULL
	,task_id BIGINT NOT NULL
	,comment TEXT NOT NULL
	,created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
	,updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

	,PRIMARY KEY(id)
	,INDEX(task_id)
);
