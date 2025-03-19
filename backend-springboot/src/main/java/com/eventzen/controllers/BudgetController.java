package com.eventzen.controllers;

import com.eventzen.entities.Budget;
import com.eventzen.repositories.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    @Autowired
    private BudgetRepository budgetRepository;

    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    @GetMapping("/{eventId}")
    public Budget getBudgetByEvent(@PathVariable Long eventId) {
        return budgetRepository.findByEventId(eventId);
    }

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        return budgetRepository.save(budget);
    }

    @PutMapping("/{eventId}")
    public Budget updateBudget(@PathVariable Long eventId, @RequestBody Budget budgetDetails) {
        return budgetRepository.findByEventId(eventId).map(budget -> {
            budget.setTotalBudget(budgetDetails.getTotalBudget());
            budget.setExpenses(budgetDetails.getExpenses());
            budget.setRevenue(budgetDetails.getRevenue());
            return budgetRepository.save(budget);
        }).orElseThrow(() -> new RuntimeException("Budget not found"));
    }

    @DeleteMapping("/{eventId}")
    public void deleteBudget(@PathVariable Long eventId) {
        Budget budget = budgetRepository.findByEventId(eventId);
        budgetRepository.delete(budget);
    }
}
