package com.msd.Task_Manager.controller;

import com.msd.Task_Manager.model.TaskModel;
import com.msd.Task_Manager.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.security.Principal;


@RestController @RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository tasks;
    public TaskController(TaskRepository tasks) {
        this.tasks = tasks;
    }

    // List only my tasks
    @GetMapping
    public List<TaskModel> list(Principal principal) {
        String userId = principal.getName();
        return tasks.findByOwnerId(userId);
    }

    // Create task for me
    @PostMapping
    public TaskModel create(@RequestBody TaskModel body, Principal principal) {
        String userId = principal.getName();
        body.setId(null);
        body.setOwnerId(userId);
        return tasks.save(body);
    }

    // Update only if I own it
    @PutMapping("/{id}")
    public TaskModel update(@PathVariable String id, @RequestBody TaskModel patch, Principal principal) {
        String userId = principal.getName();
        var existing = tasks.findById(id).orElseThrow();
        if (!userId.equals(existing.getOwnerId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        existing.setTitle(patch.getTitle());
        existing.setCompleted(patch.isCompleted());
        return tasks.save(existing);
    }

    // Delete only if I own it
    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id, Principal principal) {
        String userId = principal.getName();
        var existing = tasks.findById(id).orElseThrow();
        if (!userId.equals(existing.getOwnerId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Forbidden");
        }
        tasks.deleteById(id);
    }
}
