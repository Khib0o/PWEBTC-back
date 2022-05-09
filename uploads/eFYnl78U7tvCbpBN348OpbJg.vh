library ieee;
use ieee.std_logic_1164.all;

entity gen_binaire is
	port (
		register_input : in std_logig;
		clock : in std_logic;
		register_output : out std_logic
	);
end;

architecture behave of gen_binaire is
	signal register_state : std_logic_vector(1 to 10) := "0000000000";
begin
	register_output <= register_state(10);
	process(clock)
	begin
		if rising_edge (clock) then
			register_state(4 to 10) <= register_state(3 to 9);
			register_state(2 to 3) <= register_state(1 to 2);
			register_state(1) <= register_input;
		end if;
	end process;
end;			
