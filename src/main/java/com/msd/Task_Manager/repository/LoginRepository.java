package com.msd.Task_Manager.repository;


import com.msd.Task_Manager.model.LoginModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LoginRepository extends MongoRepository<LoginModel, String> {
    Optional<LoginModel> findByUsernameAndPassword(String username, String password);
}
