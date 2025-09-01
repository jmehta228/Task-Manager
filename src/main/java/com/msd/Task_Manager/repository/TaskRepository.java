package com.msd.Task_Manager.repository;
import com.msd.Task_Manager.model.TaskModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TaskRepository extends MongoRepository<TaskModel, String> {
    List<TaskModel> findByOwnerId(String ownerId);
}

