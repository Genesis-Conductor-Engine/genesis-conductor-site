# examples/thermo_integration_example.py
# Example wiring of BijectiveResiduationExecutor into a non-critical path
# (e.g., monitoring hook or crystal-scoring benchmark extension)

from thermo_bijection_layer import BijectiveResiduationExecutor


def example_non_critical_path(state: dict) -> dict:
    """Example operation that can be wrapped with bijective execution."""
    # Simulate a state transition (e.g., thought step or metric update)
    new_state = {**state, "processed": True, "timestamp": __import__('time').time()}
    return new_state


if __name__ == "__main__":
    executor = BijectiveResiduationExecutor()
    initial_state = {"entropy": 0.42, "phase": "seismic"}
    
    # Wire into non-critical path
    new_state, new_hash = executor.apply(example_non_critical_path, initial_state, "crystal_benchmark_hook")
    print(f"New state hash: {new_hash}")
    print(f"Trace length: {len(executor.get_execution_trace())}")
    
    # Demonstrate invertibility (for testing/benchmark)
    recovered, _ = executor.invert_last()
    print("Invert successful - state recovered.")
