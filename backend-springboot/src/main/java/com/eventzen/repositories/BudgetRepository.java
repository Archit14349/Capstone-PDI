package com.eventzen.repositories;

import com.eventzen.entities.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    @Query("SELECT SUM(b.revenue) FROM Budget b")
    Double sumRevenue();

    @Query("SELECT SUM(b.expenses) FROM Budget b")
    Double sumExpenses();
}
